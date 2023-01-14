import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {publicRequest, userRequest} from "../requestMethods";
import validator from "validator";


function EditUser() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError,setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/')[2];

    // Get the user on Load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await publicRequest.get(`/user/find/${path}`);
                setUser(res.data); 
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        };
        fetchUser();
    },[path]);


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


    // Validate Email
    const validateEmail = (value) => {
        if (validator.isEmail(value)) {
            setEmailError('Good');
            setEmail(value);
        } else {
            setEmailError('Email is invalid');
        }
    };

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


    const handleUpdate = async() => {
        try {
            if (username === ''  || email === '' || password === '') {
                toast.error("Please fill the form correctly");
            } else if (usernameError === 'Good' && validator.isEmail(email) && passwordError === 'Good') {
                await userRequest.put(`/user/${path}`, {username:username, email:email, password:password});
                toast.success('User updated successfully');
                setTimeout(() => {
                    navigate("/dashboard/users")
                }, 3000);
            }
        } catch (error) {
            toast.error(`${error.response.data.message}`)
        }
    };

    return (
        <div>
            <Navbar/>
            <ToastContainer autoClose={2000}/>

            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="row">
                        <div className="left col-md-3 col-sm-12 col-12">
                            <Sidebar/>
                        </div>
                        <div className="right col-md-9 col-sm-12 col-12">
                            <div className="eu-container">
                                <div className='eu-wrapper'>
                                    <div className="eu-title">
                                        <h6>Edit User</h6>
                                    </div>

                                    <div className="eu-form">
                                        <input type="text" placeholder='Username'  onChange={(e) => validateUsername(e.target.value)} defaultValue={user ? user.username : ''}/>
                                        {usernameError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{usernameError}</p>}

                                        <input type="email" placeholder='Email Address' onChange={(e) => validateEmail(e.target.value)} defaultValue={user ? user.email : ''}/>
                                        {emailError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{emailError}</p>}

                                        <input type="text" placeholder='Enter new password' onChange={(e) => validatePassword(e.target.value)} />
                                        {passwordError === '' ? null :<p style={{ display:'flex', justifyContent:'left', fontWeight:500, color:'orange'}}>{passwordError}</p>}

                                        <input className='eu-btn' type="button" value='Update User' onClick={handleUpdate}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;