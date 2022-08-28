import React,{useState} from 'react'
import { useNavigate  } from "react-router-dom";
import { TextField,Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
    const navigate = useNavigate ();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [fpassword, setFpassword] = useState("");
    const [spassword, setSpassword] = useState("");
    const [customalert,setAlert] = useState('');
    const [type,setType] = useState('password');
    const showAlert = async(e)=>{
        setAlert(
            <div className="alert alert-success" role="alert">
                Data saved succesfully
                <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    const Submit =async (e)=>{
        e.preventDefault();
        if(username==="" || name==="" || email===""||fpassword===""||spassword===""){
            alert("Fill these place");
        }else{
            // console.log(name,username,email,fpassword,spassword);
            const result = await fetch('http://127.0.0.1:8000/api/user/register/', {
                method: "post",
                credentials:'same-origin',
                body: JSON.stringify({ name,username, email,fpassword,spassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const status =await result.status;
            const raw = await result.json();
            // console.log(raw)
            if (status.toString() === "200") {
                showAlert();
                setEmail("");
                setName("");
                setUsername("");
                setFpassword("");
                setSpassword("");
                navigate("/signin");
            }
            if(status.toString()==="400"){
                setAlert(
                    <div className="alert alert-danger" role="alert">
                        {raw.error}
                        <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }   
        }
    }
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
        if(type==='password'){
            setType('text');
        }else{
            setType('password');
        }
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='allbody'>
            <form method="POST" onSubmit={Submit}>
                {customalert}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full Name</label>
                    <TextField id="fullWidth " type="name" size='small' label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} fullWidth  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <TextField id="fullWidth " type="username" size='small' label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <TextField id="fullWidth " type="email" size='small' label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth  required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <TextField id="fullWidth " type={type} size='small' label="Password" variant="outlined" value={fpassword} onChange={(e) => setFpassword(e.target.value)} fullWidth  required/>
                    <IconButton className='eye-button' aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Repeat Password</label>
                    <TextField id="fullWidth " type="password" size='small' label="Repeat Password" variant="outlined" value={spassword} onChange={(e) => setSpassword(e.target.value)} fullWidth  required/>
                </div>
                <Button className='add-item' fullWidth type='submit' variant="contained" color="secondary">Sign Up</Button>
            </form>
        </div>  
    )
}
