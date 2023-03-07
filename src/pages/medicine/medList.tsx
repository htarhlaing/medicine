import React, { useState,useEffect } from 'react'
import { Card,Modal,Form,Button,Table,Input,message,Space, Select } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { loadDataAPI,updateAPI,insertAPI,delAPI } from '../../services/medicine';
import { delImage } from '../../utils/tools';
import MyUpload from '../../components/myUpload';
import { loadDataAPI as loadCategoryAPI } from '../../services/medicine-category';

export default function MedList() {
  const [query,setQuery]=useState([]);
  const [myform]=Form.useForm()
  const [isShow,setIsShow]=useState(false)
  const [data,setData]=useState([])
  const [currentID,setCurrentID]=useState('')
  const [total,setTotal]=useState(0)
  const [category,setCategory]=useState([])
  useEffect(()=>{
loadDataAPI(query).then(res=>{
  console.log(res);
  
  setData(res.data.list)
  setTotal(res.data.total)

})
  },[query])
  useEffect(()=>{
    if(!isShow)
    {
setCurrentID('')

    }
    
},[isShow])
useEffect(()=>{
  loadCategoryAPI({per:100}).then(res=>{
    setCategory(res.data.list)
  })
  
})
  return (
    <>
    <Card title="medicine information" extra={
      <>
      <Button type='primary' icon={<PlusOutlined/>} onClick={
        ()=>{
          setIsShow(true)
        }}></Button>
      </>
    }>
      <Form layout='inline' onFinish={(v)=>{
       setQuery(v)
        
      }}>
        <Form.Item label="Information" name='name'>
          <Input placeholder='please enter your search'/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' 
          icon={<SearchOutlined/>} ></Button>
        </Form.Item>
      </Form>
      <Table 
      dataSource={data}
      columns={[{title:"ID",width:80,render(v,r,i)
    {return <span>{i+1}</span>}},
    {title:"Name",width:'200px',dataIndex:"name"},
    {title:"Picture",width:"120px",render(v,r){
   return <img className='t-img' src={delImage(r.image)} alt={r.name}/>
    }},
    {title:"Category",width:"120px",render(v,r:any){
      return <>{r.category?.name || "not yet"}</>
       }},
    {title:"Description",dataIndex:'desc'},
    {title:"Operation",width:'110px',render(v,r:any){
      return <Space>
        <Button type='primary' size='small' icon={<EditOutlined/> 
        }  onClick={()=>{
          setIsShow(true)
          myform.setFieldsValue(r)
          setCurrentID(r.id);
        }}
        ></Button>
        <Button type='primary' size='small' icon={<DeleteOutlined/>} danger 
        onClick={async()=>{
          await delAPI(r.id)
          setQuery([])
        }}
        ></Button>
      </Space>}}
  ]}
  
pagination={
  {
    total,
    onChange(page)
    {
      setQuery({...query,page})
    }
  }

}
>
      </Table>
    </Card>
    <Modal title="Setting"  
    destroyOnClose
    open={isShow}
    maskClosable={false}
      onCancel={()=>{setIsShow(false)}}
      onOk={()=>{myform.submit()}}
      >
        <Form labelCol={{span:4}} form={myform}
        preserve={false} onFinish={async(v)=>{
          if(currentID)
          {
            await(updateAPI(currentID,v))
          }
          else{
            await(insertAPI(v))
          }
          message.success("save successfully!")
          setIsShow(false)
          setQuery([])
        }}>
          <Form.Item label='name' name='name'>
            <Input placeholder='Enter your search'></Input>
          </Form.Item>
          <Form.Item label="category" name='medicineCategoryId'>
          <Select allowClear>
            {category.map((item:any)=>{return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>})}
            
          </Select>
          </Form.Item>
          <Form.Item label="picture"><MyUpload/></Form.Item>
          <Form.Item label="description" name="desc">
    <Input.TextArea placeholder="Enter description"/>
</Form.Item>
        </Form>

      </Modal>
    
    
    </>
  )
}
