import React, { useEffect } from 'react'
import {Card,Button,Form,Table, Space,Modal,message,Input, Popconfirm,} from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined } from '@ant-design/icons'
import MyUpload from '../../components/myUpload';
import { loadDataAPI,updateAPI,insertAPI,delAPI } from '../../services/medicine-category';
import { useState } from 'react';
import { delImage } from '../../utils/tools';


export default function MedCategory()
{
    const [isShow,setIsShow]=React.useState(false);
    const [myform]=Form.useForm(); //can get submit
    const [query,setQuery]=useState([])
    const [data,setData]=useState([])
    const [currentId,setCurrentID]=useState('')//if currentid = null it means the data is insert otherwise the data is update
    const [total,setTotal]=useState(0)
    const [imageUrl, setImageUrl] = useState('');

    useEffect((
    )=>{
        loadDataAPI(query).then((res)=>
        {
            setData(res.data.list)
            setTotal(res.data.total)
        })
    },[query])
    useEffect(()=>{
        if(!isShow)
        {
setCurrentID('')
setImageUrl('')
        }
        
    },[isShow])
    return (
        <>
        <Card title="medicine Category" extra={
            <>
            <Button type='primary'
            icon={<PlusOutlined/>}
            onClick={()=>{setIsShow(true)}}
            ></Button>
            </>
        }>

<Space direction='vertical' style={{width:"100%"}}>
<Form layout='inline' onFinish={(v)=>{
    setQuery(v)
}}>
    <Form.Item label="stockName" name='name'>
        <Input placeholder='please enter your search' allowClear/>
    </Form.Item>
    <Form.Item>
        <Button htmlType='submit' type='primary' icon={<SearchOutlined/>}></Button>
    </Form.Item>
</Form>
<Table dataSource={data}
rowKey='id' 
columns={[{title:"ID",width:80,align:'center',render(v,r,i){return <span>{i+1}</span>}},
{title:"Name",dataIndex:'name',width:'180px'},
{title:"Picture",width:120,align:'center',render(v,r:any){
    return <img className='t-img' src={delImage(r.image)} alt={r.name}/>}},
{title:"Description",dataIndex:'desc'},
{title:"Operation",width:110,align:'center',render(v,r:any){return <Space>
    <Button type='primary' 
    icon={<EditOutlined/>} 
    size='small' 
    onClick={()=>{
        setIsShow(true)
        setCurrentID(r.id);
        setImageUrl(r.image)
        myform.setFieldsValue(r)
    
    }}
    ></Button>
      <Popconfirm title='are you sure you want to delete?' 
      onConfirm={async()=>{
            await delAPI(r.id)
            setQuery([]);
        }}>
    <Button type='primary' icon={<DeleteOutlined/>} size='small' danger
    />
    </Popconfirm>
    
</Space>}}]
}
pagination={
    {total,
    onChange(page)
    {
        console.log(page);
        
      setQuery({...query,page})
      
    }}
}
>
</Table>
</Space>

        </Card>
        <Modal title="Settings"
         open={isShow} 
         destroyOnClose
        maskClosable={false}//only close when click the cancel
         onCancel={()=>setIsShow(false)} 
         onOk={()=>{
            myform.submit() 
       }}>
           
<Form onFinish={async(v)=>{//once ok it will arrive to onFinish
       console.log("onFinishe",v)
if(currentId)
{
    console.log("currentid",currentId);

    await updateAPI(currentId,{...v,image:imageUrl})
}
else
{
    await insertAPI({...v,image:imageUrl})
}
  
      message.success("save successfully")
      setIsShow(false)
      setQuery([])
    }}
labelCol={{span:4}} form={myform}
preserve={false}
>
    
<Form.Item label="name" name="name">
    <Input placeholder='Enter stocke name'></Input>
</Form.Item>
<Form.Item label="picture"><MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl}/></Form.Item>
<Form.Item label="description" name="desc">
    <Input.TextArea placeholder="Enter description"/>
</Form.Item>
</Form>
        </Modal>

        </>
    )

}