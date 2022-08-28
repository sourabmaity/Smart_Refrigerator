import './App.css';
import Header from './components/Header';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import {AuthProvider} from './context/AuthContext';
function App() {
  return (
    <>
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/signin" element={<SignIn />} />

            </Routes>    
          </AuthProvider>
        </Router>
    </>
  );
}

export default App;
