import {get,post,patch,del} from '../utils/request'

export const loadDataAPI =(query:any={})=>get('/admin/medicines',query)
export const loadDataByID=(id:string)=>get('/admin/medicines/'+id)
export const insertAPI=(data:any)=>post("/admin/medicines",data)
export const updateAPI=(id:string, data:any)=>patch("/admin/medicines/"+id,data)
export const delAPI=(id:string)=>del('/admin/medicines/'+id)
export const delManyAPI=(id:string)=>del("/admin/medicines/remove_many?ids="+id)