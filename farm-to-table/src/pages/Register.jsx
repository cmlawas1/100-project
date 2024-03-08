import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/register',{fname, lname, email, password})
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
            {/* <form className="register-form" action="/register" method="post"> */}
                <input value={fname} onChange={(e) => setFName(e.target.value)} placeholder="First Name*" id="fname" name="fname" type="text" required />
                <input value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Last Name*" id="lname" name="lname" type="text" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com*" id="email" name="email" required />
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="set password*" id="password" name="password" required />
                <button type="submit" className="green">Register</button>
            </form>
            <button className="link-btn" onClick={navigateToLogin} >Already have an account? Login here.</button>
        </div>

    )
}