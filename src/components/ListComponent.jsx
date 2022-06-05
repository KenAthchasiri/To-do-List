import React from 'react'
import './ListComponent.css'
import { BiEdit,BiTrash } from "react-icons/bi"

const ListComponent = (props) => {
    const {id,title,removeItem,editItem} = props
    return (
        <div className='list-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
                <BiEdit className='btn' onClick={()=>editItem(id)}/>
                <BiTrash className='btn' onClick={()=>removeItem(id)}/>
            </div>
        </div>
    )
}

export default ListComponent