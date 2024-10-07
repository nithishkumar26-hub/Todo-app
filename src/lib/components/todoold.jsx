import React, { useState } from 'react'

const App = () => {
  const [getName,setgetName]=useState("");
  const [todo,settodo]=useState([])
  const [update,setUpdate]=useState(null)

  const handleChange = (e) =>{
      setgetName(e.target.value);
  }

  function handleClick(){
    if(update){
        settodo(todo.map((todos)=> todos.id === update.id ? {...todo,name:getName} : todo))
        setUpdate(null)
    }
    else{
      settodo([...todo,{id:todo.length+1,name:getName}])
    }
    setgetName("")
  }

  const handleDown=(e)=>{
      if(e.key === "Enter"){
        settodo([...todo,{id:todo.length+1,name:e.target.value}])
      }
 }

  const handleDelete = (id) =>{
      settodo(todo.filter((todos)=> id !== todos.id))
  }

  const handleUpdate = (todo) =>{
      setgetName(todo.name)
      setUpdate(todo)
  }
  
  return (
    <div className='font-poppins'>
      <div className='bg-pink-500 w-[100vw] h-[100vh] flex justify-center pt-44 '>
        <div className='w-1/2 h-[75%] bg-white rounded-xl '>
          <div className='text-4xl font-medium flex justify-center p-7'>To-do Application</div>
          <hr className='w-full h-[0.3px] border-black'/>
          <div className='font-medium pl-8 pt-5 pb-5 text-xl'>Enter Task:</div>
          <div className='flex flex-row'>
              <input className='w-[80%] h-14 rounded-md ml-8 border border-black outline-gray-400 pl-3 text-xl' onChange={(e)=>handleChange(e)} value={getName} onKeyDown={(e)=>handleDown(e)}/>
              <button className='w-[10%] h-14 ml-4 bg-green-500 text-white text-center rounded-md hover:bg-green-800' onClick={()=>handleClick()} >Add</button>
          </div>
          {todo.map((todos)=>(
              <ol key={todos.id} className='pl-20 pt-6 text-2xl list-disc flex flex-row'>
                <li >{todos.name}</li>
                <button className='ml-5 py-2 px-4 rounded-lg text-center text-white bg-blue-500 text-base hover:bg-blue-800' onClick={()=>handleUpdate(todos)}>Update</button>
                <button className='ml-5 py-2 px-4 rounded-lg text-center text-white bg-red-500 text-base hover:bg-red-800' onClick={()=>handleDelete(todos.id)}>Delete</button>
              </ol>
             
          ))}
        </div>
      </div>
    </div>
  )
}

export default App