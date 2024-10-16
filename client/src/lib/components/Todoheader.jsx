import React from 'react'

export const Todoheader = ({value,handleClick,setValue}) => {
    function handleChange(e){
       
        setValue(e.target.value)
    }

    function handleDown(e){
        if(e.key === "Enter"){
            handleClick()
        }
    }
  return (
    <div>
        <input value={value} type='text' maxLength={50} placeholder='Add Your task' 
        className='w-[80%] h-[50px] pl-2 text-base placeholder-gray-400 bg-[rgba(0,0,0,0.5)] text-white
        rounded py-2 px-2 border-none outline-none' onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleDown(e)} />
        <button className='w-[20%] border-none outline-none  text-white leading-3 rounded bg-[#1e811b] px-2 max-sm:text-sm  ml-3 hover:brightness-110 active:brightness-125' 
        onClick={handleClick}>Add Task</button>
    </div>
  )
}
