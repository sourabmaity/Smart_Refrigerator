import React, { useState,useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AddRecipe from './Formfield/AddRecipe';
import Ingredient from './Formfield/Ingredient';
import Process from './Formfield/Process';
import Others from './Formfield/Others';
import Confirmation from './Formfield/Confirmation';

export default function AddItem(props) {
    const navigate = useNavigate();
    let {authToken} = useContext(AuthContext);
    const [page, setPage] = useState(0);
    const [progress,setProgress] = useState(0);
    const [formData, setFormData] = useState({
        recipe_name: "",
        vegetables: [],
        ingredients: [],
        recipe_process: [],
        video_link: "",
    });
    console.log(formData)
    const addRecipe = async ()=>{
        console.log(authToken)
        const data = fetch("http://127.0.0.1:8000/api/addrecipe/",{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access)
            },
        })
        // console.log(await data)
        window.location.reload();
    }
    const nextClick = (e)=>{
        e.preventDefault();
        if(page!==4){
            if((page===0 && formData.recipe_name==="") || (page===1&&formData.ingredients.length===0) || (page===2 &&formData.recipe_process.length===0)){
                alert("Required field is empty")
            }else{
                if (page === FormData.length - 1) {
                    window.alert("Are you done with the registration");
                    window.location.reload();
                } else {
                    setProgress(progress+25);
                    setPage(page + 1);
                }
            }
        }else{
            addRecipe()
            console.log("submitted")
        }
    }
    const backClick = (e) => {
        e.preventDefault();
        if(page===0){
            props.Open(false)
            localStorage.clear();
        }else{
            setProgress(progress-25);
            setPage(page - 1);
        }
    }
    const PageDisplay = ()=>{
        if (page === 0) {
            return <AddRecipe formData={formData} setFormData={setFormData}/>;
        } else if (page === 1) {
            return <Ingredient formData={formData} setFormData={setFormData}/>
        } else if (page === 2) {
            return <Process formData={formData} setFormData={setFormData}/>;
        } else if(page===3){
            return <Others formData={formData} setFormData={setFormData}/>;
        }else{
            return <Confirmation />;
        }
    }
    const FormData = ["Recipe Name & Vegetables", "Ingredients", "Process", "Others","Submission"];
    return (
        <div className='add-recipe'>
            <div className="progress-bar shadow bg-secondary rounded-3">
                <div className="div text-center" style={{width:progress+"%",backgroundColor: page === 4 ? "green" : "purple",}}></div>
            </div>
            {/* <form className='add-item-form' onSubmit={()=>addRecipe()} > */}
            <form className='add-item-form'>
                <h3 className={`"display-2" ${page === 4 ? "text-success" : "text-purple"} text-center`}>{FormData[page]}</h3>
                <div className="recipe-form">
                    {PageDisplay()}
                    {/*  */}
                </div>
                <div className="buttons">
                    <Button fullWidth onClick={backClick} className='add-item' variant="outlined">{page !== 0 ? "Back" : "Cancel"}</Button>
                    <Button fullWidth className='add-item' color='secondary' type='submit' variant="contained" onClick={nextClick}>{page !== 4 ? "Next" : "Finish & Add"}</Button>
                </div>
            </form>
        </div>
    )
}
