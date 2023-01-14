import React, {useState, useEffect} from 'react';
import {userRequest} from "../../requestMethods";
import {MdDeleteOutline} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const res = await userRequest.get('/user/few');
                setUsers(res.data)
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        };

        fetchUsers();
    }, []);

    return (
        <>
                <ToastContainer autoClose={2000}/>
                {users.map((user) => (
                    <div className="user-details" key={user._id}>
                        <div className="one">
                            <img src={`https://ui-avatars.com/api/?name=${user?.username}`} alt=""/>
                        </div>
                        <div className="two">
                            <p>{user.username}</p>
                        </div>
                        <div className="btn-icons">
                            <MdDeleteOutline style={{fontSize:20, color:'red', cursor:'pointer'}} />
                            <FiEdit style={{fontSize:20, color:'green', cursor:'pointer'}}/>
                        </div>
                    </div>
                ))}
            </>
    );
}

export default UserDetails;