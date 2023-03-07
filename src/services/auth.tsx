import {post} from '../utils/request'

type loginData={
    userName:string;
    password:string
}
export const loginAPI=(data:loginData)=>post("/auth/admin_login",data)