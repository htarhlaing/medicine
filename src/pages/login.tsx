import React, { useContext } from 'react'
import {Row,Col,Card,Form, Input,Button, message} from 'antd'
import {logoImg, setToken} from '../utils/tools'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/auth'
import { context } from '../components/AppProvider'
export default function Login() {
  const navigate=useNavigate()
  // const {resetMenu}=useContext(context)
  return (
    <Row>
      <Col md={{span:8,push:8}} xs={{span:22, push:1}}>
      <img src={logoImg} alt="" style={{display:'block',margin:'20px auto', borderRadius:'16px', width:'200px'}}/>
      <Card title="Good Doctor Login">
        <Form labelCol={{
          md:{
            span:4
          }
        }} onFinish={async(v)=>{
          console.log(v);
          
          const res=await loginAPI(v)
          if(res.success){
            message.success("login successfully")
            setToken(res.data)
            // resetMenu('admin')
            navigate("/admin/dashboard")
          }
          else{
            message.error(res.errorMessage);
          }}
          
          }>
          <Form.Item label="username" name="userName" rules={[{required:true, message:"Enter your username"}]}>
            <Input placeholder="username"/>
          </Form.Item>
          <Form.Item label="password" name="password" rules={[{required:true, message:"Enter your password"}]}>
          <Input placeholder="password"/>
          </Form.Item>
          <Form.Item >
            <Button htmlType='submit' type='primary' style={{display:'block', margin:"8px auto ", width:'20vw'}}>Login</Button>
          </Form.Item>

        </Form>
      </Card>
      </Col>
    </Row>

  )
}
