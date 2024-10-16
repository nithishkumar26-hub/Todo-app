import React, { useEffect, useState } from 'react'
import { Alert } from './Alert'
import edit from '../../assets/edit.svg'


export const Todo = () => {
    const [todo,setTodo]=useState(localStorage.getItem("todos")? 
    JSON.parse(localStorage.getItem("todos")) : [])
    const [value,setValue]=useState("")
    const [update,setUpdate]=useState("")
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState("")
  

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todo))
    },[todo])

    

    function handleChange(e){
       
            setValue(e.target.value)
    }

    function handleDown(e){
        if(e.key === "Enter"){
            handleClick()
        }
    }
    function handleClick(){
        if(!value || value.trim() === ''){
            setAlert(true)
            setMessage("Please Add Any Task")
            return;
        }
        if(update && value ){
            setTodo(todo.map((todo)=>todo.id === update.id ? {...todo,id:todo.id,name:value,isCompleted:todo.isCompleted} : todo))
            setAlert(true)
            setMessage("Task Edited Successfully!")
        }
        else if(value){
            if(todo.length == 0){
                handleAdd()
                
            }
            else{
           
                const isDuplicate=todo.some((todo)=>todo.name.trim().replace(/\s+/g, '').toLocaleUpperCase()  === value.trim().replace(/\s+/g, '').toLocaleUpperCase())
                if (isDuplicate) {
                    handleAddNew(); // Call handleAddNew if the value matches
                  } else {
                    handleAdd(); // Call handleAdd if no match is found
                  }
            }
           
             
        }
        
        setValue("")
    }

    function handleAdd(){
        setTodo([...todo,{id:todo.length+1,name:value,isCompleted:false}])
       
    }

    function handleAddNew(){
        setTodo(todo)
        setAlert(true)
        setMessage("Task Already Exist")
        
    }


    function handleDelete(id){
        setTodo(todo.filter((todos)=>id!== todos.id))
        setAlert(true)
        setMessage("Task Deleted Successfully")
       
        
    }

    function handleEdit(todo){
        setValue(todo.name)
        setUpdate(todo)
    }

    function handleOkay(id){
        
        // setFinish((selected)=>{
        //     if(selected.includes(values.id)){
        //         return selected.filter((id)=>id !== values.id)
        //     }
        //     else{
        //         return [...finish,values.id]
        //     }
        // })
        setTodo(todo.map((todo)=>todo.id === id ? {...todo,id:todo.id,isCompleted:!todo.isCompleted} : todo))
       
       
    }

  return (
    <div className='w-full min-h-screen   flex justify-center '>
       
        <div className='pt-5 flex flex-col items-center w-[40%] max-xl:w-[70%] max-sm:w-[90%] max-md:w-[70%] max-lg:w-[70%] fixed   '>
        {alert ?(
        <>
            <Alert message={message} alert={alert} setAlert={setAlert} />
           
        </>
        )
        :
        null}
            <div className=' mt-20 w-full '>
                <p className='text-yellow-400 font-semibold flex w-full justify-start text-3xl    '>
                    To-Do List
                </p>
                <div className='flex flex-row justify-center my-5 w-full'>
                    <input value={value} type='text' maxLength={50} placeholder='Add Your task' className='w-[80%] h-[50px] pl-2 text-base placeholder-gray-400 bg-[rgba(0,0,0,0.5)] text-white
                    rounded py-2 px-2 border-none outline-none' onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleDown(e)} />
                    <button className='w-[20%] border-none outline-none  text-white leading-3 rounded bg-[#1e811b] px-2 max-sm:text-sm  ml-3 hover:brightness-110 active:brightness-125' onClick={handleClick}>Add Task</button>
                </div>
                <p className='text-white justify-start text-sm w-full'>Fill task details</p>
                <div className='w-full p-5 bg-[rgba(0,0,0,0.5)] text-white flex flex-col rounded '>
                    <span className='text-base text-red-600 sticky'>List of tasks</span>
                    <div className='max-h-[400px] overflow-y-auto'>
                    {todo.length === 0 
                    ?
                    <p className='p-2 flex justify-center items-center text-white'>No Tasks Found</p>
                    :
                   
                    todo.map((todos)=>(
                        
                        
                            <ul className='flex justify-between my-2' key={todos.id}>
                                <li id="list" className={` px-2 py-2 flex-1 hover:bg-[rgba(0,0,0,2)] hover:rounded cursor-pointer font-medium select-none w-[75%] 
                                break-words  ${todos.isCompleted ? "line-through text-slate-400 hover:bg-[rgba(0,0,0,0.8)]" : ""}`} onClick={()=>handleOkay(todos.id)}>{todos.name}</li>
                                    <button onClick={()=>handleEdit(todos)} className='p-2'>
                                        <img src={edit} alt='edit' className='w-5 h-5'/>
                                    </button>
                                <button className='p-2 cursor-pointer' onClick={()=>handleDelete(todos.id)}>&#10005;</button>
                            </ul>
                        
                    ))}
                    </div>
                
                    
                </div>
            </div>
            
        </div>
    </div>
  )
}

// ${finish.includes(todos.id) ? 'line-through' : ''}