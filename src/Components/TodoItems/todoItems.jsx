import React from 'react'
import Check from './Assets/circle-check-solid.svg'
import NotCheck from './Assets/circle-regular.svg'
import Delete from './Assets/trash-solid.svg'

export default function todoItems({Text, id, isComplete, deleteTodo, toggle}) {
  return (
    <div className='flex items-start my-3 gap-2'>
      <div onClick={() => {toggle(id)}} className='flex flex-1 cursor-pointer gap-2 items-start'>
        <img src={isComplete ? Check : NotCheck} alt="" className='w-5' />
        <p className={`${isComplete ? "line-through" : ""}`}>{Text}</p>
      </div>
      <img src={Delete} alt="" className='w-3.5 cursor-pointer' onClick={() => {deleteTodo(id)}}/>
    </div>
  )
}
