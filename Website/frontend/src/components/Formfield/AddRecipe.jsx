import React from 'react'
import { TextField } from '@mui/material';

export default function AddRecipe({ formData, setFormData }) {

    return (
        <div>
            <TextField fullWidth id="filled-basic" value={formData.recipe_name} onChange={(e) => setFormData({ ...formData, recipe_name: e.target.value })} label="Recipe Name" variant="filled" required/>
        </div>
    )
}
