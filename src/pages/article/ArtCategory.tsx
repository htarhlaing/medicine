import React, { useEffect, useState } from 'react'
import { Card,Modal,Form,Button,Table,Input,message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { loadArticleAPI } from '../../services/article-category';
export default function ArtCategory() {
  const [query,setQuery]=useState([]);
  useEffect(()=>{
loadArticleAPI(query).then(res=>{console.log(res);
})
  },[query])
  return (
    
    <>
    <Card title="artitle category" extra={
      <>
      <Button type='primary' icon={<PlusOutlined/>} onClick={
        ()=>{}}></Button>
      </>
    }>
      <Form layout='inline' onFinish={(v)=>{
        console.log(v)
        
      }}>
        <Form.Item label="Title" name='name'>
          <Input placeholder='please enter your search'/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' 
          icon={<SearchOutlined/>}></Button>
        </Form.Item>
      </Form>
      <Table
      columns={[{title:"ID",width:80,},
    {title:"Name",width:'180px'},
    {title:"Picture",width:"120px"},
    {title:"Description"},
    {title:"Operation",width:'110px'}
  ]}
      >

      </Table>
    </Card>
    </>
  )
}
