import {get,post,patch,del} from '../utils/request'

export const loadDataAPI =(query:any={})=>get('/admin/medicine_categories',query)
export const loadDataByID=(id:string)=>get('/admin/medicine_categories/'+id)
export const insertAPI=(data:any)=>post("/admin/medicine_categories",data)
export const updateAPI=(id:string, data:any)=>patch("/admin/medicine_categories/"+id,data)
export const delAPI=(id:string)=>del('/admin/medicine_categories/'+id)
export const delManyAPI=(id:string)=>del("/admin/medicine_categories/remove_many?ids="+id)