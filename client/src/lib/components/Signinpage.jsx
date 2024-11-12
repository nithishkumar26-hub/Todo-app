import React, { useEffect, useState } from 'react'
import "../../App.css"
import { Todoinput } from './Todoinput'
import { Link } from 'react-router-dom'
export const Signinpage = () => {
  const [value,setValue]=useState("");
  const [valuepass,setValuepass]=useState("");
  const [goto,setGoto]=useState(false)
  // const [alert,setAlert]=useState(false)
  const [gaali,setGaali]=useState(false);
  console.log(value)
  console.log(valuepass)
  
  useEffect(()=>{
    setGaali(false)
  },[value])

  const userName=value;
  
  const userPassword=valuepass;
  
  function validateUsername(name){
    const regex= /^[A-Za-z0-9]+$/;
    if (regex.test(name)){
      setGoto(true)
    }
    else{
      alert("Username must contain only letters and numbers")
    }
  }
  
  function validatePassword(password){
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (regex.test(password)){
      setGoto(true)
    }
    else{
      alert("Password must have one UpperCase, One special symbols and one number")
    }
  }

  function handleClick(){
    if(!value && !valuepass){
      console.log("value and valuepass not present");
      setGaali(true)
    }
    else if(!value && valuepass || value && !valuepass){
      console.log("value or valuepass not present");
    }
    else{
      validateUsername(userName)
      validatePassword(userPassword)
    }
  }
  return (
    <div id='bgsignin' className='py-32'>
      <div className='w-[35%] pt-5 mx-auto flex items-center bg-[rgba(0,0,0,0.5)] rounded-md '>
        <div className='flex flex-col w-full'>
          <div className='flex justify-center my-4 text-white text-3xl'>WELCOME</div>
          <div className='flex justify-start mx-10 flex-col'>
            <div className=' text-white'>UserName:</div>
            <div className='py-3'>
              <Todoinput value={value} setValue={setValue} handleClick={handleClick} maxLength={15} type={"text"}/>
              {gaali ?
              <span className='text-red-400'>Username is Mandatory</span> :
              ""}
            </div>
           
          </div>
         
          <div className='flex justify-start mx-10 flex-col'>
            <div className=' text-white'>Password:</div>
            <div className='py-3'>
              <Todoinput value={valuepass} setValue={setValuepass} handleClick={handleClick} maxLength={10} type={"password"}  />
              {gaali ?
              <span className='text-red-400'>Password is Mandatory</span> :
              ""}
            </div>
          </div>
          
              <Link to={goto ? "/Todo"  :"/" }>
                <div className='flex justify-center'>
                    <button className='w-[80%] flex justify-center bg-[#DE8F5F] 
                    py-2 mt-4 mb-12 rounded text-white' onClick={handleClick}>Submit</button>
                </div>
              </Link>
           

          
          
          
        </div>
        
      </div>
    </div>
    
  )
}
