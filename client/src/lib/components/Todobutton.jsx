import React from 'react'

export const Todobutton = ({handleClick}) => {
  return (
    <>
        <button className='w-[20%] border-none outline-none  text-white leading-3 rounded bg-[#1e811b] px-2 max-sm:text-sm  
        ml-3 hover:brightness-110 active:brightness-125' onClick={handleClick}>Add Task</button>
    </>
  )
}
