import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import {Link} from 'react-router-dom';
import {userRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../redux/userSlice';
import moment from 'moment';
import '../spinner.css'


function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const r_user = useSelector((state) => state.user.currentUser.user);
    useEffect(() => {
        const fetchUsers = async() => {
           try {
            setLoading(true);
            const res = await userRequest.get('/user');
            setUsers(res.data);
            setLoading(false)
           } catch (error) {
            toast.error(error.response.data)
           }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await userRequest.delete(`/user/${id}`);
            if (r_user._id === id) {
                dispatch(logout())
            }
            setUsers(() => {
                return users.filter((user) => user._id !== id)
            })
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error(error.response.data);
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
                        {loading ?  <div className="loader">Loading...</div> :
                        <div className="right col-md-9 col-sm-12 col-12">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">User</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody> 
                                    <>
                                        {users && users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{moment(user.createdAt).fromNow()}</td>
                                                <td>
                                                    <AiOutlineDelete style={{fontSize: 20, color:'red', marginRight:10, cursor:'pointer'}} onClick={() => handleDelete(user._id)}/>
                                                    {user?.fromGoogle === true ? '' :
                                                        <Link to={`/users/${user._id}`} style={{textDecoration:'none'}}>
                                                            <AiOutlineEdit style={{fontSize: 20, color:'green', cursor:'pointer'}}/>
                                                        </Link>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;