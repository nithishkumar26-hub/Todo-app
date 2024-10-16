import React from 'react'
import edit from '../../assets/edit.svg'
import check from "../../assets/round.svg"
import checked from "../../assets/roundcheck.svg"
import heart from "../../assets/heart.svg"
import heartfill from "../../assets/heartfill.svg"

export const Todobody = ({todo,handleOkay,handleEdit,handleDelete,handleFavourite}) => {
    console.log(todo)
  return (
    <>

        <div className='max-h-[400px] overflow-y-auto'>
        
            {todo.length === 0 
            ?
            <p className='p-2 flex justify-center items-center text-white'>No Tasks Found</p>
            :
                   
            todo.map((todos)=>(
                        
                <ul className='flex justify-between my-2' key={todos._id}>
                    {todos.isCompleted
                    ?
                    <img src={checked} alt='check' className='w-5 h-5 my-2'/>
                    :
                    <img src={check} alt='check' className='w-5 h-5 my-2'/>}
                   
                    <li id="list" className={` ml-1 px-2 py-2 flex-1 hover:bg-[rgba(0,0,0,2)] hover:rounded cursor-pointer font-medium select-none w-[75%] 
                    break-words  ${todos.isCompleted ? "line-through text-slate-400 hover:bg-[rgba(0,0,0,0.8)]" : ""}`} onClick={()=>handleOkay(todos)}>
                        {todos.name}
                    </li>
                    {todos.isFavourite ?
                        <button className='p-2' onClick={()=>handleFavourite(todos)}>
                            <img src={heartfill} alt='heart-filled' className='w-5 h-5'/>
                        </button>
                        :
                        <button className='p-2' onClick={()=>handleFavourite(todos)}>
                            <img src={heart} alt='heart' className='w-5 h-5'/>
                        </button>
                    }
                    <button onClick={()=>handleEdit(todos)} className='p-2'>
                        <img src={edit} alt='edit' className='w-5 h-5'/>
                    </button>
                    <button className='p-2 cursor-pointer' onClick={()=>handleDelete(todos._id)}>&#10005;</button>
                </ul>
                        
            ))}
        
        </div>
    </>
  )
}
