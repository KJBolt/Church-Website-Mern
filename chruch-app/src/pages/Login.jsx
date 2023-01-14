import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {publicRequest} from "../requestMethods";
import {useDispatch} from 'react-redux';
import {login} from '../redux/userSlice';
import {useSelector} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth, provider} from '../firebase';
import {signInWithPopup } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser.user);

    // Sign in User with google info
    const signInUser = async(result) => {
        try {
            const res = await publicRequest.post('/auth/google', {
                username: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            });
            dispatch(login(res.data));
            navigate('/home');
            setTimeout(() => {
                window.location.reload();
            },1000)
        } catch (error) {
            toast.error(error.response.data)
        }
        
    };

    // Handle Google Authentication Popup and get user info
    const handleOAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                signInUser(result)
            }).catch((error) => {
            console.log(error.message)
        });
    };


    const handleLogin = async() => {
        try {
            if (email === '' || password === '') {
                toast.error("Please fill fields correctly");
            } else {
                const response = await publicRequest.post('/auth/login', {email:email,password:password});
                dispatch(login(response.data));
                if (user !== null) {
                    navigate('/home');
                    window.location.reload()
                }
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
                        <div className="left col-md-6 col-sm-12 col-12">
                            <div className="content">
                                <h5>Act 11:26</h5>
                                <h3>LET THE BIBLE SPEAK</h3>
                            </div>
                        </div>
                        <div className="right col-md-6 col-sm-12 col-12">
                           <h5>The Christians</h5>
                            <p>Let the bible speak</p>
                            <div className="login-inputs">
                                <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required/>
                                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                                <br/>
                                <button className='btn1' onClick={handleLogin}>Login</button>
                                <br/>
                                <button className='btn2' onClick={handleOAuth}>
                                    <img src={require('../assets/google.png')} alt='' height={30} width={30}/>
                                    Sign in with Google
                                </button>

                                <div className="link">
                                    <p>Not a user? <Link to='/register' style={{textDecoration:'none', color:'#f45d48'}}>Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </>
    );
}

export default Login;