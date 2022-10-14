import React from 'react'
import Button from '@mui/material/Button';
import ShowProcess from './ShowProcess';
import { useState } from 'react';
export default function Process({ formData, setFormData }) {
  var fsteps = []
  if(localStorage.getItem("steps")===null){
    fsteps = []
  }else{
    fsteps = JSON.parse(localStorage.getItem("steps"));
  }
  const [steps,setSteps] = useState(fsteps);
  const [edit,setEdit] = useState(0);
  const [once,setOnce]=useState(true);
  const addStep = (e)=>{
    e.preventDefault();
    var arr = steps
    arr.push(e.target.value)
    setSteps([...arr]);
    localStorage.setItem("steps",JSON.stringify(steps));
    setEdit(1)
    if(once===false){
      setOnce(true);
    }
  }

  const toEditSave = (e)=>{
    if(edit===0){
      setEdit(1)
    }else{
      setEdit(0)
      localStorage.setItem("steps",JSON.stringify(steps));
    }
  }
  return (
    <div>
      <div className='d-flex gap-process justify-content-center'>
        <Button className='add-item' color='primary' variant="contained" value={0} onClick={addStep}>Add Process</Button>
        <Button className='add-item justify-content-between' color='secondary' value={1} onClick={addStep} variant="contained" >Add Timer<img value={1} src="https://www.freeiconspng.com/uploads/timer-icon-26.png" width="23" alt="Icons Windows Timer For" /></Button>
      </div>
      <div className="process">
        {steps.length!==0?steps.map((item,index)=>{
              return <ShowProcess editable={edit} formData={formData} setFormData={setFormData} steps={steps} setSteps={setSteps} item={item} index={index} once={once} setOnce={setOnce}/>
        }):<p className='text-center'>Process doesn't exist</p>}
      </div>
      <div className="d-flex gap-process edit-save justify-content-center">
        {steps.length!==0?<Button className='add-item' color={edit===0?'primary':'success'} variant="contained" value={0} onClick={toEditSave}>{edit===0?"Edit":"Save"}</Button>:null}
      </div>
    </div>
  )
}
