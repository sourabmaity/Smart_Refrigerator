import React from "react";
import {Navigate } from "react-router-dom";
// import Dashboard from "../components/Dashboard";

const PrivateRoute = (props) => {
    function isauth(){
        return localStorage.getItem("Authtoken")!==null;
    }
    const authed = isauth() // isauth() returns true or false based on localStorage
    
    return authed ? props.child : <Navigate to="/signin" />;
}

export default PrivateRoute;