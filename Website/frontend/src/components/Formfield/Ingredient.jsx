import React from 'react'
import { TextField } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ShowIngredients from './ShowIngredients';

export default function Ingredient({ formData, setFormData }) {
  const [ingredient,setIngredient] = useState("")
  const setingredient = (e)=>{
    e.preventDefault()
    setIngredient(e.target.value)
  }
  const saveIngredient = (e)=>{
    e.preventDefault();
    if(ingredient===""){
      alert("Field is empty");
    }else{
      var arr = formData.ingredients
      arr.push(ingredient)
      setFormData({...formData,ingredients:arr})
      setIngredient("");

    }
  }
  return (
    <div>
      <TextField fullWidth id="filled-basic" value={ingredient} onChange={setingredient} label="Ingredients Name" variant="filled" required/>
      <Button fullWidth className='add-item' color='success' variant="contained" onClick={saveIngredient}>Add</Button>
      <List className='item-list'>
        {formData.ingredients.length!==0?formData.ingredients.map((item,index)=>{
            return <ShowIngredients formData={formData} key={index} setFormData={setFormData} item={item} index={index}/>
        }):<li className='text-center'>Ingredient doesn't exist</li>}
      </List>
    </div>
  )
}
