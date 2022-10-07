import React from 'react'
import { TextField } from '@mui/material';

export default function Others({formData,setFormData}) {
  return (
    <div>
      <TextField id="standard-input" value={formData.video_link} onChange={(e)=>setFormData({...formData,video_link:e.target.value})} fullWidth label="Tutorial link" type="url" variant="filled"/>
    </div>
  )
}
