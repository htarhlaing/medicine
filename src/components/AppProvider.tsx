import React,{createContext, useState} from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    ReadOutlined,
    DashboardOutlined,
    MedicineBoxOutlined
    
  } from '@ant-design/icons';
import Dashboard from '../pages/dashboard';
import MedCategory from '../pages/medicine/medCategory';
import MedList from '../pages/medicine/medList';
import ArtCategory from '../pages/article/ArtCategory';
import ArtList from '../pages/article/ArtList';
import User from '../pages/user';
export const context=createContext<any>({})
const sideMenuData=[
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined/>,
      label: 'Dashboard',
      element:<Dashboard/>
    },
    {
      key: '/admin/medicine',
      icon: <MedicineBoxOutlined/>,
      label: 'Medicine',
      roles:['admin','editor'],
      children: [{
          label:"Category",
          key:'/admin/medicine/category',
          element:<MedCategory/>,
          roles:['admin']
      },
        {
            label:"Information",
            key:"/admin/medicine/information",
            element:<MedList/>,
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
        element:<ArtCategory/>,
        roles:['admin']
    },
      {
          label:"Information",
          key:"/admin/article/information",
          element:<ArtList/>,
          roles:['admin','editor']
          
      }]
    },
    {
        key: '/admin/user',
        icon: <UserOutlined />,
        label: 'User Information',
        element:<User/>,
        roles:['kf','admin']
      },
  ]

  function fineRoles(role:String)
  {
      const arr:any=[]
      fineInfo(sideMenuData);
function fineInfo(key:any,parent:any=null)
{
key.forEach((item:any)=>{
    const {children,...info}=item
    console.log("item in fineRoles",item);
    
    if(children)
    {
        info.children=[]
        console.log("info in fineRoles",info);
        
        fineInfo(children,info.children)
        info.children.length==0?delete info.children:null;
    }
    if(info.roles)
    {
            if(info.roles?.includes(role)) 
            parent?parent.push(info):arr.push(info)
    }
    else
    {
        parent?parent.push(info):arr.push(info)
    }

})
}
return arr

}
function flatRoles(menus:any)
{
        const arr:any=[]
        function fineInfo(data:any)
        {data.forEach((item:any)=>{
            const {children,...info}=item
            arr.push(info)
            if(children)
            {
                fineInfo(children)
            }
        })}
        fineInfo(menus)
        return arr;
}
export default function AppProvider({children}:any) {
    const [menus,setMenu]=useState([])
    const [routes,setRoutes]=useState([])
    
    const resetMenu=(role:string)=>{
const tmpMenu=fineRoles(role)
console.log("tmpMenus",tmpMenu);

setMenu(tmpMenu)
setRoutes(flatRoles(tmpMenu))
    }
  return (
   <context.Provider value={{menus,routes,resetMenu}}>{children}</context.Provider>
  )
}
