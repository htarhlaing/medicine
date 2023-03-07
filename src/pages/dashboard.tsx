import React,{useEffect, useState} from 'react'
import {Card} from 'antd'
import { formatDate } from '../utils/tools'
export default function Dashboard()
{
    const [time,setTime]=useState( formatDate(Date.now()))
    useEffect(()=>{
        const timer=setInterval(()=>{
            setTime(formatDate(Date.now()))
        },1000)
    })
    return (
       <>
       <Card title="Dashboard" extra={
            <>
          {time}
            </>
       }
            ></Card>
       </>
    )
}