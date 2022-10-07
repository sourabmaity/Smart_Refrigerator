import React from 'react';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';

export default function ShowIngredients({formData, setFormData,item,index}) {
    const Delete = (e)=>{
        var id = e.target.value;
        let updateItmes = formData.ingredients.filter((e,index) => {
            return index !== parseInt(id);
        });
        setFormData({...formData,ingredients:updateItmes});
    }
    return (
        <ListItem disablePadding>
            <ListItemButton className='justify-content-between'>
                <li key={item} >{item}</li>
                <Button value={index} onClick={Delete} size="small" type='submit' variant="contained" color="error">Delete</Button>
            </ListItemButton>
        </ListItem>
    )
}
