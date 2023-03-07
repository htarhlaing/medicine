import React, { useContext, useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ReadOutlined,
  DashboardOutlined,
  MedicineBoxOutlined
  
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, theme,message,Breadcrumb } from 'antd';
import logo from '../assets/doctor.jpeg'
import { useNavigate,useLocation, useLoaderData } from 'react-router-dom';
import DropLayout from './DropLayout';
// import { context } from './AppProvider';


const { Header, Sider, Content } = Layout;

const MyLayout = ({children}:any) => {
  // const {menus}=useContext(context)
  // console.log("This is menu",context);
  const sideMenuData=[
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined/>,
      label: 'Dashboard',
     
    },
    {
      key: '/admin/medicine',
      icon: <MedicineBoxOutlined/>,
      label: 'Medicine',
      roles:['admin','editor'],
      children: [{
          label:"Category",
          key:'/admin/medicine/category',
          roles:['admin']
      },
        {
            label:"Information",
            key:"/admin/medicine/information",
            roles:['admin','editor']
        }]
    },
    {
      key: '/admin/article',
      icon: <ReadOutlined/>,
      label: 'Articles',
      roles:['admin','editor'],
      children: [{
        label:"Category",
        key:'/admin/article/category',
        roles:['admin']
    },
      {
          label:"Information",
          key:"/admin/article/information",
          roles:['admin','editor']
          
      }]
    },
    {
        key: '/admin/user',
        icon: <UserOutlined />,
        label: 'User Information',
        roles:['kf','admin']
      },
  ]
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate=useNavigate()

  const {pathname}=useLocation()
  
 const findOpenKeys=(key: string )=>{
   const result: string []=[];
   const findInfo=(arr :any)=>{
     arr.forEach((item:any)=>{
       if(key.includes(item.key)) 
       {result.push(item.key)
        if(item.children)
        {
          findInfo(item.children )
        }
      }
     })
     
   }
   findInfo(sideMenuData)
   
   return result
 }
 const tempOpenKey=findOpenKeys(pathname)
 const findDeepPath=(key: string )=>{
  const result:any =[];
  const findInfo=(arr: any)=>{
    arr.forEach((item:any)=>{
      const {children,...info}=item
  result.push(info)
  if(children)
  {
    findInfo(children)
  }
    })
  }
  // console.log("result",result);
  /*esult []0: {key: '/admin/dashboard', icon: {…}, label:
   'Dashboard'}1: {key: '/admin/medicine', icon: {…}, label: 'Medicine'}
   2: {label: 'Category', key: '/admin/medicine/category'}3: {label: 'Information', key: '/admin/medicine/information'}4: 
   {key: '/admin/article', icon: {…}, label: 'Articles'}5: {label: 'Category', key: '/admin/article/category'}6: 
   {label: 'Information', key: '/admin/article/information'}7: {key: '/admin/user', icon: {…}, label: 'User Information'}
   length: 8[[Prototype]]: Array(0)*/
  
  findInfo(sideMenuData)
  const tempData=result.filter((item:any)=>{return key.includes(item.key)});
 
  
  if(tempData.length>0)
  {
    return [{label:"Home",key:"/admin/dashboard"},...tempData]
  }
  return [];
   }
   const [breadcrumbs,setBreadcrumbs]=useState<any>([]);

React.useEffect(()=>{
  setBreadcrumbs(findDeepPath(pathname))
},[pathname])

 
  return (
   
    <Layout style={{width:"100vw" ,height:"100vh"}} id='components-layout-demo-custom-trigger'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
        <img src={logo} alt="doctor" />
        </div>
        <Menu
        items={sideMenuData}
        defaultSelectedKeys={tempOpenKey}
        defaultOpenKeys={tempOpenKey}
          theme="light"
          mode="inline"
          onClick={({key})=>{
            navigate(key)
          }}
          
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
         
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
           <span>Good Doctor Systems</span>
     
          <Dropdown overlay={
          <Menu 
          
          onClick={({key})=>{
            if(key==="logOut")
            {
              navigate('/')
            }else
            {
              message.info("No Data Yet")
            }
          }}
          items={[{label:"user Center", key:'userCenter'},{label:"log Out",key:"logOut"}]}/>}
          >
            <img src={logo} style={{width:"40px", borderRadius:'50%',float:'right',marginTop:'16px', marginRight:'15px'}} alt="" />
          </Dropdown>
        </Header>
        <Content

          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow:'auto'
          }}
        >
          <Breadcrumb>
          {breadcrumbs.map((item:any)=>{return (<Breadcrumb.Item>{item.label}</Breadcrumb.Item>)})}
  
  </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
