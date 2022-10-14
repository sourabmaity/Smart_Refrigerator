import React,{useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import {Button} from '@mui/material'
export default function Header() {
    let {username,logoutUser} = useContext(AuthContext);
    // console.log(username["username"])
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">LoGo</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {username ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myrecipies">My Recipies</Link>
                            </li>
                            <li className="nav-item" style={{"margin": "auto"}}>
                                <Button fullWidth className='add-item' variant="contained" size="small" onClick={logoutUser} color="error">LogOut</Button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">SignIn</Link>
                            </li>
                        </>
                    )}
                </ul>
                
            </div>
            {username ?  (username.username) : null}
        </nav>
    )
}
