import '../index.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './../images/brand-logo.png';
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/login',{email, password}) //communicates with backend to validate login
        .then(result => {
            console.log(result);
            if(result.data.success) {
                alert('Successfully logged in.');
                if(email === 'mer@chant.com') { //checks if it's the admin that is trying to log in
                    navigate('/merchant-home');
                } else {
                    navigate('/customer-home');
                }
                
            } else {
                alert('Wrong email or password.');
            }
        })
        .catch(error => console.log(error));
    }

    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='App'>
            <div className="auth-form-container">
                <h2><img src={logo} style={{ width: "200px", alignItems: "center" }} /><br /><br />please log in to acccess the site.</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email" />
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button type="submit" className="green">Log in</button>
                </form>
                <button className="link-btn" onClick={navigateToRegister}>Don't have an account? Register here.</button>
            </div>
        </div>
    )
}