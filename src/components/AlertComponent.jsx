import React, { useEffect } from 'react'
import './AlertComponent.css'

const AlertComponent = (props) => {
    const {msg,type,setAlert,list} = props

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setAlert({show: false, msg: '' ,type: ''})
        },3000) // 3s
        return()=>clearTimeout(timeOut)
    },[list])
    return (
        <div>
            <p className={`alert ${type}`}>{msg}</p>
        </div>
    )
}

export default AlertComponent