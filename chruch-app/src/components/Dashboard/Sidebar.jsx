import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {FcHome} from 'react-icons/fc';
import {FcBusinessman} from 'react-icons/fc';
import {FcKindle} from 'react-icons/fc';
import {GoSignOut} from 'react-icons/go';
import {FcOvertime} from 'react-icons/fc'
import {useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";

function Sidebar() {
    const location = useLocation();
    const pathname = location.pathname.split('/')[2];
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="first">
            <h6>Dashboard</h6>
            <ul>
                <Link to='/dashboard/' style={{textDecoration:'none', color:`${pathname === '' ? '#f45d48' : 'grey'}`}}>
                    <li><FcHome style={{fontSize: 20, marginRight: 10}}/> Home</li>
                </Link>

                <Link to='/dashboard/users' style={{textDecoration:'none', color:`${pathname === 'users' ? '#f45d48' : 'grey'}`}}>
                    <li><FcBusinessman style={{fontSize: 20, marginRight: 10}}/> Users</li>
                </Link>

                <Link to='/dashboard/posts' style={{textDecoration:'none', color:`${pathname === 'posts' ? '#f45d48' : 'grey'}`}}>
                    <li><FcKindle style={{fontSize: 20, marginRight: 10}}/> Posts</li>
                </Link>

                <Link to='/dashboard/videos' style={{textDecoration:'none', color:`${pathname === 'videos' ? '#f45d48' : 'grey'}`}}>
                    <li><FcKindle style={{fontSize: 20, marginRight: 10}}/> Videos</li>
                </Link>

                <Link to='/dashboard/audios' style={{textDecoration:'none', color:`${pathname === 'audios' ? '#f45d48' : 'grey'}`}}>
                    <li><FcKindle style={{fontSize: 20, marginRight: 10}}/> Audios</li>
                </Link>

                <Link to='/dashboard/events' style={{textDecoration:'none', color:`${pathname === 'events' ? '#f45d48' : 'grey'}`}}>
                    <li><FcOvertime style={{fontSize: 20, marginRight: 10}}/> Events</li>
                </Link>

                <Link style={{textDecoration:'none', color:'grey'}}>
                    <li className='logout' onClick={handleLogout}><GoSignOut style={{fontSize: 20, marginRight: 10}}/> Logout</li>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;