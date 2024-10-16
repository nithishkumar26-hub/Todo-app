import React, { useEffect, useState } from 'react'
import { Alert } from './Alert'
import sort from '../../assets/sort.svg'
import axios from 'axios'
import { Todoinput } from './Todoinput'
import { Todobutton } from './Todobutton'
import { Todobody } from './Todobody'
import Searchfill from "../../assets/searchfill.svg"

export const Todonode = () => {
    const [todo,setTodo]=useState([])
    const [value,setValue]=useState("")
    const [update,setUpdate]=useState("")
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState("")
    const [isAscending,setisAscending]=useState(false)
    const [isSearch,setisSearch]=useState(false)
    const [filterTodo,setfilterTodo]=useState([])
    axios.defaults.withCredentials= true;
    useEffect(()=>{
       
            fetchTodos()
    },[])

    function fetchTodos(){
        axios.get('https://todo-app-api-nithish.vercel.app/get',{withCredentials: true})
        .then(result => (setTodo(result.data),console.log(result.data),setfilterTodo(result.data)))
        .catch(err => console.log(err))
        
        
    }

    function getTodos(){
       
            
            axios.get('https://todo-app-api-nithish.vercel.app/sort',{withCredentials: true})
            .then(result => setTodo(result.data),setfilterTodo(result.data))
            .catch(err => console.log(err))
        
    }

    
    function handleClick(){
        if(!value || value.trim() === ''){
            setAlert(true)
            setMessage("Please Add Any Task")
            return;
        }
        if(update && value ){
            //find method  method returns the value of the first element that passes a test.
            //id todo._id == update._id then returns the _id value
            const isEdit=todo.find((todo)=>todo._id === update._id  )
            if(isEdit){
                handleEdited(isEdit._id);
            }
           
        }
        else if(value){
            if(todo.length == 0){
                handleAdd()
                
            }
            else{
                //some method returns true (and stops) if the function returns true for one of the array elements.
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
        // setTodo([...todo,{id:todo.length+1,name:value,isCompleted:false}])
        
        axios.post('https://todo-app-api-nithish.vercel.app/add',{name: value, id:todo.length+1, withCredentials: true})
        .then(result => {
            fetchTodos()
        }
        )
        .catch(err => console.log(err))
        setAlert(true)
        setMessage("Task Added Successfully")
    }

    function handleEdited(id){
       
        axios.patch('https://todo-app-api-nithish.vercel.app/update/'+id,{name: value, withCredentials: true})
        .then(result => {
            fetchTodos()
        })
        .catch(err => console.log(err))
        setAlert(true)
        setMessage("Task Edited Successfully!")
    }

    function handleAddNew(){
        setTodo(todo)
        setAlert(true)
        setMessage("Task Already Exist")
        
    }


    function handleDelete(id){
        // setTodo(todo.filter((todos)=>id!== todos.id))
        
        axios.delete('https://todo-app-api-nithish.vercel.app/delete/'+id,{withCredentials: true})
        .then(result => {
            fetchTodos()
        })
        .catch(err => console.log(err))
        setAlert(true)
        setMessage("Task Deleted Successfully")
        
    }

    function handleEdit(todo){
        console.log(todo)
        setValue(todo.name)
        setUpdate(todo)
    }

    function handleOkay(todo){
        
        
        // setTodo(todo.map((todo)=>todo.id === id ? {...todo,id:todo.id,isCompleted:!todo.isCompleted} : todo))
        axios.put('https://todo-app-api-nithish.vercel.app/update/'+todo._id,{isCompleted:todo.isCompleted, withCredentials: true})
        .then(result=> {
            fetchTodos()
        })
        .catch(err => console.log(err))
       
    }

    function handleHeart(todo){
        axios.put('https://todo-app-api-nithish.vercel.app/favoadd/'+todo._id,{isFavourite:todo.isFavourite, withCredentials: true})
        .then(result => {
            fetchTodos()
        })
        .catch(err => console.log(err))
        if(todo.isFavourite){
            setAlert(true)
            setMessage("Task removed to Favourites")
        }
        else{
            setAlert(true)
            setMessage("Task added to Favourites")
        }
    }

    function handleSort(){
       setisAscending(!isAscending)
        // getTodos()
       
    }

    function handleSearch(){
        setisSearch(!isSearch)
    }

    function filterTodos(value){
        console.log(value)
        setfilterTodo(todo.filter(todo => 
            todo.name && todo.name.toLowerCase().startsWith(value.toLowerCase())  // Check for exact match
        ));
        
        
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
                <div className='w-full flex justify-around'>   
                    <p className='text-yellow-400 font-semibold flex w-full justify-start text-3xl    '>
                        To-Do List
                    </p>
                    <button className='px-3 py-2 hover:bg-[rgba(0,0,0,0.5)] hover:rounded-full ' onClick={handleSearch}>
                        <img src={Searchfill} alt='searchfill' className='w-6 h-6'/>
                    </button>
                    <button className='flex flex-row leading-3 hover:bg-[rgba(0,0,0,0.5)] hover:rounded px-2 py-2 outline-none ' onClick={handleSort}>
                        <img src={sort} alt='sort' className='w-5 h-5'/>
                        <span className='text-white px-3 text-xl'>Sort</span>
                    </button>
                    
                </div>
               
                <div className='flex flex-row justify-center my-5 w-full'>

                    {isSearch ? 
                     <Todoinput value={""} setValue={""} handleClick={handleClick} placeholder={"Add Your Task"}  disabled={"disabled"} />
                     :
                     <Todoinput value={value} setValue={setValue} handleClick={handleClick} placeholder={"Add Your Task"} isSearch={isSearch}  />
                    }
                        
                    <Todobutton handleClick={handleClick}/>
                </div>
                <p className='text-white justify-start text-sm w-full'>Fill task details</p>
                <div className='w-full p-5 bg-[rgba(0,0,0,0.5)] text-white flex flex-col rounded '>
                    <div className='w-full flex items-center flex-col'>
                        <span className='text-base text-red-600 sticky w-full flex items-start'>List of tasks</span>
                        {isSearch ? 
                        <div className='w-full flex justify-center'>
                            <Todoinput value={value} setValue={setValue} handleClick={handleClick} placeholder={"Search Your Task"} filterTodos={filterTodos} isSearch={isSearch} />
                            <button className='ml-6 px-4 py-2 cursor-pointer hover:bg-[rgba(0,0,0,0.5)] hover:rounded-full' onClick={handleSearch} >&#10005;</button>
                        </div>
                        
                        :
                        ""}
                        
                    </div>
                    
                        <Todobody todo={filterTodo} handleOkay={handleOkay} handleEdit={handleEdit} handleDelete={handleDelete} handleFavourite={handleHeart}/>
                    
                </div>
            </div>
            
        </div>
    </div>
  )
}

// ${finish.includes(todos.id) ? 'line-through' : ''}
