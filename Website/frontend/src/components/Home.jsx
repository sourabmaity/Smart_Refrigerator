import React,{useState,useEffect} from 'react'

export default function Home() {
    let [hometext,setText] = useState("");
    useEffect(()=>{
        setHomeText();
    },[])
    async function setHomeText(){
        let response = await fetch('https://smrtfrze.herokuapp.com/api/');
        let data = await response.json();
        setText(data['API']);
    }
    return (
        <div className='allbody home text-center'>
            {hometext}
        </div>
    )
}
