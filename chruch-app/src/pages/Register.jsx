import React,{useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {publicRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from "validator";



function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError,setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();


    // Validate Password
    const validatePassword =  (value) => {
        if (validator.isStrongPassword(value, {
            minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPasswordError('Good');
            setPassword(value)
        } else {
            setPasswordError('Not a strong password')
        }
    };


    // Validate Email
    const validateEmail = (value) => {
        if (validator.isEmail(value)) {
            setEmailError('Good');
            setEmail(value);
        } else {
            setEmailError('Email is invalid');
        }
    };



    // Validate Full Name
    const validateUsername = (value) => {
        const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
        if (!regex.test(value)) {
            setUsernameError('Fullname is invalid');
        } else {
            setUsernameError('Good');
            setUsername(value)
        }
    };

    // Execute the register function
    const handleRegister = async() => {
        try {
            if (usernameError === ''  || email === '' || password === '') {
                toast.error("Please fill the form correctly");
            } else if (usernameError === 'Good' && validator.isEmail(email) && passwordError === 'Good') {
                await publicRequest.post('/auth/register', {username:username, email:email, password:password});
                toast.success('Registration Successful');
                setTimeout(() => {
                    navigate('/verify-email');
                }, 3000);
            }
        } catch (error) {
            toast.error(`${error.response.data}`)
        }
    };

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <div className='login-container'>
                <div className="login-wrapper">
                    <div className="row">
                        <div className="left col-sm-6 col-12">
                            <div className="content">
                                <h5>Act 11:26</h5>
                                <h3>LET THE BIBLE SPEAK</h3>
                            </div>
                        </div>
                        <div className="right col-sm-6 col-12">
                            <h5>The Christians</h5>
                            <p>Let the bible speak</p>
                            <div className="login-inputs">
                                <input type="text" placeholder='Full name' onChange={(e) => validateUsername(e.target.value)}/>
                                {usernameError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{usernameError}</p>}

                                <input type="email" placeholder='Email Address'  onChange={(e) => validateEmail(e.target.value)}/>
                                {emailError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{emailError}</p>}

                                <input type="password" placeholder='Password' onChange={(e) => validatePassword(e.target.value)} />
                                {passwordError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{passwordError}</p>}
                                <br/>
                                <button className='btn1' onClick={handleRegister}>Register</button>
                                <div className="link">
                                    <p>Already a user? <Link to='/login' style={{textDecoration:'none', color:'#f45d48'}}>Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;