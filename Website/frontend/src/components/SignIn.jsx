import React,{useContext,useState} from 'react'
import AuthContext from '../context/AuthContext'
import { TextField,Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignIn() {
    let {loginUser,customalert} = useContext(AuthContext);
    let [type,setType] = useState('password');
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
            <form onSubmit={loginUser}>
                {customalert}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <TextField size="small" type="email" name='email' className="form-control"  required id="outlined-required" label="Email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <label htmlFor="exampleInputPassword1">Password</label>
                <div className="form-group">
                  <TextField className="form-control" name='password' size='small' id="outlined-password-input pass" label="Password" type={type} autoComplete="current-password" required/>
                  <IconButton className='eye-button' aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <Button className='add-item' fullWidth type='submit' variant="contained" color="secondary">Sign In</Button>
            </form>
        </div>  
    )
}
