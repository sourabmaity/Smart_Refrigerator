import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { TextField } from '@mui/material';
import AuthContext from '../context/AuthContext';

export default function Singlerecipe(props) {
    let {authToken} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [edit,setEdit] = useState(0);
    const [deleteconfirm,setDeleteConfirm] = useState(false);
    const [loader,setLoader] = useState(false);
    const [recipename,setRecipename] = useState(props.recipe["recipe_name"])
    const temp_recipe_name = props.recipe["recipe_name"]
    const handleClickOpen = (e) => {
        setOpen(true);
        //props.recipe["id"]
        if(e.target.value==='delete'){
            setDeleteConfirm(true)
        }else if(e.target.value==='1'){
            setEdit(1)
        }else{
            setEdit(0)
        }
    };
    const handleClose = () => {
        setOpen(false);
        setRecipename(temp_recipe_name)
        setEdit(0)
        setDeleteConfirm(false)
    };
    const setRecipeName=(e)=>{
        setRecipename(e.target.value)
    }
    const handleSave = (e)=>{
        console.log("saved")
    }
    const handleDelete=async (e)=>{
        setLoader(true)
        await fetch(`https://smrtfrze.herokuapp.com/api/recipedelete/${e.target.value}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access)
            },
        }).then(response=>response.json()).then(json=>{
            setLoader(false);
            if(json["alert"]){
                props.setMyrecipies([])
            }else{
                props.setMyrecipies(json)
            }
            props.setDeleteAlert(
                <div style={{width:"100%"}} className="alert alert-success" role="alert">
                    <b>Recive has been successfully deleted</b>
                    <button onClick={()=>{props.setDeleteAlert('')}} type="button" className="add-item close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        })
        setOpen(false);
    }
    return (
        <div className='recipecard'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="./loading.gif"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.recipe["recipe_name"]}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>{props.recipe["videourl"]}</p>
                        <p>{props.recipe["votes"]}</p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" value={1} onClick={handleClickOpen}>Edit</Button>
                    <Button size="small" variant="contained" color="error" value={"delete"} onClick={handleClickOpen}>Delete</Button>
                    <Button size="small" variant="contained" value={0} color="secondary" onClick={handleClickOpen}>Learn More</Button>
                </CardActions>
            </Card>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="my-recipe">
                            {loader?
                                <div className="loader">
                                    <img src="./loading.gif" width={40} alt="" />
                                </div>:
                                null
                            }
                            {deleteconfirm?
                                <div className="text-center">
                                    <p>Khabardar !!</p>
                                    <p>Dude !! mujhe chodkar bada pachtaoge.badmein rona mat🤗</p>
                                    <Button size="small" variant="contained" color="error" value={props.recipe["id"]} onClick={handleDelete}>Continue to Delete</Button>
                                </div>
                                :
                                <>
                                <div className="recipe">
                                    <TextField fullWidth className="stepSize" id="filled-read-only-input" value={recipename} onChange={setRecipeName} label={`Recipe Name`} InputProps={edit?{ readOnly: false}:{readOnly:true}} variant="filled"/>
                                </div>
                                {edit?
                                    <div className="buttons">
                                        <Button size="small" variant="contained" onClick={handleClose}>Cancel</Button>
                                        <Button size="small" variant="contained" color='success' onClick={handleSave}>Save Changes</Button>
                                    </div>
                                :null}
                                </>
                            }
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
