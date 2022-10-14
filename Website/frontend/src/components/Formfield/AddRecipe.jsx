import React from 'react'
import { TextField } from '@mui/material';
import {useEffect } from 'react';
import Vegetables from './Vegetables';

export default function AddRecipe({ formData, setFormData }) {
    
    const checkList = ["Potato", "Tomato", "Brinjal", "Pointed gourd", "Capsicum", "Lady finger", "Carrot", "Bitter gourd", "Cauliflower", "Spong gourd", "Taro root", "Green beans", "Chilly", "Garlic", "Ginger", "Lemon", "Green peas","Onion"];
    useEffect(()=>{
        for(var i=0;i<formData.vegetables.length;i++){
            const name = formData.vegetables[i];
            document.getElementsByName(name)[0].checked = true;
        }
    },[formData]);
    const handleCheck = (event) => {
        var updatedList = [...formData.vegetables];
        if (event.target.checked ) {
            updatedList = [...formData.vegetables, event.target.value];
        } else {
            updatedList.splice(formData.vegetables.indexOf(event.target.value), 1);
        }
        setFormData({...formData,vegetables:updatedList})
    };
    return (
        <div>
            <TextField fullWidth id="filled-basic" value={formData.recipe_name} onChange={(e) => setFormData({ ...formData, recipe_name: e.target.value })} label="Recipe Name" variant="filled" required/>
            <Vegetables formData={formData} checkList={checkList} handleCheck={handleCheck}/>
            
        </div>
    )
}
