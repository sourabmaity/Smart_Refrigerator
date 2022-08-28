import React from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function AddItem(props) {
    const addRecipe = ()=>{
        console.log("hi")
    }
    return (
        <div className='add-recipe'>
            <form onSubmit={()=>addRecipe()} >
                <div className="recipe-form">
                    <TextField required id="standard-required" label="Recipe Name" variant="standard" />
                </div>
                <div className="buttons">
                    <Button onClick={()=>props.Open(false)} className='add-item' variant="outlined">Cancel</Button>
                    <Button type="submit" className='add-item' color='success' variant="contained">Save</Button>
                </div>
            </form>
        </div>
    )
}
