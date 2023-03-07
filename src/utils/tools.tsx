import logo from '../assets/doctor.jpeg'

export const logoImg=logo
export const formatDate=(time:Number)=>{
    if(!time) return ''
   return new Date(time).toString()

}
export const serverUrl='http://localhost:3006';

export const setToken=(token:string)=>sessionStorage.setItem("token",token)

export const getToken=()=>sessionStorage.getItem("token")

export const delImage=(img:string)=>{
    if(img)
    {
        if(img.startsWith('http')) return img
        return serverUrl+img
    }
    return logoImg
}

export const upLoadActionURL=serverUrl+"/common/uploadx"

