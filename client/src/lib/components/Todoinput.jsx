import React from 'react'

export const Todoinput = ({value,setValue,handleClick,placeholder,disabled,filterTodos,isSearch}) => {
    function handleChange(e){
       
        setValue(e.target.value)
        if(isSearch){
          filterTodos(value)
        }
       
    }
    
    function handleDown(e){
        if(e.key === "Enter"){
            handleClick()
        }
    }
  return (
    
    <>
         <input value={value} type='text' maxLength={50} placeholder={placeholder} className='w-[80%] h-[50px] pl-2 text-base placeholder-gray-400 bg-[rgba(0,0,0,0.5)] text-white
        rounded py-2 px-2 border-none outline-none' onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleDown(e)} disabled={disabled} />
    </>
  )
}
