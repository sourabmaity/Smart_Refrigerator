import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AddItem from './AddItem';
export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('steps');
  }
  const handleChange = React.useCallback((newValue) => {
    setOpen(newValue);
  }, []);
  return (
    <div className='allbody dashboard'>
        <Button className='add-item' onClick={handleOpen} variant="contained">Add Recipe</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <AddItem Open={handleChange}/>
            </Typography>
          </Box>
        </Modal>
        <form className="dashboard-search-form form-inline align-center my-2 my-lg-0 d-inline w-100">
          <TextField className='search-box' size="small" id="fullWidth" label="Search" variant="outlined" />
          <Button className='search-item' onClick={()=>{console.log("Hello")}} variant="contained">Search</Button>
        </form>
    </div>
  )
}
