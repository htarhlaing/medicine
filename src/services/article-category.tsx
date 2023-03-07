import {get,post,patch,del} from '../utils/request'
export const loadArticleAPI=(query:any)=>get('/admin/article_categories',query)
export const loadArticleIDAPI=(id:string)=>get('/admin/article_categories/'+id)
export const insertArticleAPI=(data:any)=>post('/admin/article_categories',data)
export const updateArticleAPI=(id:string, data:any)=>patch("/admin/article_categories/"+id,data)
export const delArticleAPI=(id:string)=>del('/admin/article_categories/'+id)
export const delManyArticleAPI=(id:string)=>del("/admin/article_categories/remove_many?ids="+id)