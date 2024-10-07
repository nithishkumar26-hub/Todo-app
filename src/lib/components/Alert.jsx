import React, { useEffect, useState } from 'react';

export const Alert = ({ message,alert,setAlert }) => {
  // const [alert,setAlert] = useState(false);
  console.log(alert)

  useEffect(()=>{
    const timeout=setTimeout(()=>{
      if(alert){
        setAlert(false)
      }
    },3000)
    return ()=>clearTimeout(timeout)
  })

  

  function handleClose() {
    setAlert(false)// Trigger close and then auto-reset it
  }

  return (
    alert ? (
      <div className='flex justify-center w-[60%] fixed '>
        <div className=' h-10 bg-[rgba(0,0,0,0.5)] text-white rounded shadow-md flex justify-between items-center px-3'>
          <p className='px-4'>{message}</p>
          <button onClick={handleClose}>&#10005;</button>
        </div>
      </div>
    ) : null
  );
};
