import React from 'react'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

export default function ShowProcess({editable,formData, setFormData,steps,setSteps,item,index}) {
    const Delete = (e)=>{
        e.preventDefault()
        var id = e.target.value;
        let updateItmes = formData.recipe_process.filter((e,index) => {
            return index !== parseInt(id);
        });
        setFormData({...formData,recipe_process:updateItmes});
        updateItmes = steps.filter((e,index) => {
            return index !== parseInt(id);
        });
        setSteps([...updateItmes]);
        localStorage.setItem('steps',JSON.stringify(updateItmes))
    }
    const setProcess = (e)=>{
        var arr = formData.recipe_process
        if(arr[index] !== undefined){
            arr[index] = (e.target.value)
        }else{
            arr.push(e.target.value)
        }
        setFormData({...formData,recipe_process:arr})
    }
    return (
        <div className='process-box'>
            {item==='0'?
            <TextField className="stepSize" id="filled-read-only-input" value={formData.recipe_process[index]} onChange={setProcess} label={`Step ${index+1}`} InputProps={editable===1?{ readOnly: false}:{readOnly:true}} variant="filled"/>:
            <TextField className='timer' id="standard-read-only-input" value={formData.recipe_process[index]} onChange={setProcess} label="Time in minutes" type="number" InputLabelProps={{shrink: true}} InputProps={editable===1?{ readOnly: false}:{readOnly:true}} variant="filled"/>}
            <Button value={index} onClick={Delete} size="small" type='submit' variant="contained" color="error">Delete</Button>
        </div>
    )
}
