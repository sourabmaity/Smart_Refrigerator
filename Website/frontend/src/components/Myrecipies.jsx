import React, { useState,useEffect,useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Singlerecipe from './Singlerecipe';

export default function Myrecipies() {
    const [myrecipies,setMyrecipies] = useState([]);
    const [showalert,setAlert] = useState('');
    const [loader,setLoader] = useState(true);
    const [showdeletealert,setDeleteAlert] = useState('');
    let {authToken} = useContext(AuthContext);
    useEffect(()=>{
        (async()=>{
            await fetch("https://smrtfrze.herokuapp.com/api/getuserdashboard/",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            }).then(response=>response.json()).then(json=>{
                if(json["alert"]){
                    setAlert(json["alert"])
                }else{
                    setMyrecipies(json);
                }
                setLoader(false);
            })
        })()
        
    },[myrecipies,setLoader])
    return (
        <>
        <div className='recipebody'>
            {loader?
            <div className="loader">
                <img src="./loading.gif" width={40} alt="" />
            </div>:null}
            {showdeletealert}
            {myrecipies.length!==0?myrecipies.map((recipe,index)=>{
                return <Singlerecipe setMyrecipies={setMyrecipies} recipe={recipe} setDeleteAlert={setDeleteAlert} key={`recipe${index}`}/>
            }):
            <>
            <p className='text-center'>{showalert}</p>
            </>
            }
        </div>
        </>
    )
}
