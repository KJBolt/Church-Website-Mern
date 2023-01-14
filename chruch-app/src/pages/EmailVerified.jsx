import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmailVerified() {
    const [user, setUser] = useState({});
    const location = useLocation();
    const token = location.pathname.split('/')[2];

    useEffect(() => {
        const verifyEmail = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/auth/verify/${token}`);
                setUser(res.data)
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        }
        verifyEmail()
    }, [token])


  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div>
            {user.verified === false ? <div>Verification Unsuccessful. Please try again</div> : <div className='verifyEmail'>
            <div className="verify-wrapper">
                    <div className="image">
                        <img src={require('../assets/agreement.png')} alt="" />
                    </div>
                    <h3>Congratulations on verifying your email address</h3>
                    <div className="btn">
                        <Link to='/login' style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <button>Proceed to login</button>
                        </Link>
                    </div>
                    
                </div>
            </div>}
        </div>
    </>
  )
}

export default EmailVerified