import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {MdKeyboardArrowDown} from 'react-icons/md';
import {logout} from '../redux/userSlice';
import {refreshPost} from '../redux/postSlice';


function Navbar() {
    const [showMenu, setShowMenu] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.user.currentUser.user);
    const path = location.pathname.split('/')[1];

    const handleShow = () => {
        setShowButton(!showButton);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(refreshPost());
    };

  return (
      <>
        <div className='navbar-section'>
            {user?.isAdmin === true ?
                <div className='nav-wrapper'>
                    <Link to='/home' style={{ textDecoration:'none', color:'black' }}>
                        <div className="logo">
                            <h4>Christians</h4>
                        </div>
                    </Link>
                    <div className="links">
                        <ul>
                            <Link to='/home' style={{ textDecoration:'none', color:`${path === 'home' ? '#f45d48' : 'black'}` }}>
                                <li>Home</li>
                            </Link>

                            <Link to='/teachings' style={{ textDecoration:'none', color:`${path === 'teachings' ? '#f45d48' : 'black'}` }}>
                                <li>Bible Study</li>
                            </Link>

                            <Link to='/dashboard/' style={{ textDecoration:'none', color:`${path === 'dashboard' ? '#f45d48' : 'black'}` }} >
                                <li>Dashboard</li>
                            </Link>

                            <Link to='/gallery' style={{ textDecoration:'none', color:`${path === 'gallery' ? '#f45d48' : 'black'}` }}>
                                <li>Gallery & Events</li>
                            </Link>

                            <Link to='/about' style={{ textDecoration:'none', color:`${path === 'about' ? '#f45d48' : 'black'}` }}>
                                <li>About Us</li>
                            </Link>
                        </ul>
                    </div>
                </div> :
                <div className='nav-wrapper'>
                    <Link to='/home' style={{ textDecoration:'none', color:'black' }}>
                        <div className="logo">
                            <h4>Christians</h4>
                        </div>
                    </Link>
                    <div className="links">
                        <ul>
                            <Link to='/home' style={{ textDecoration:'none', color:`${path === 'home' ? '#f45d48' : 'black'}` }}>
                                <li>Home</li>
                            </Link>

                            <Link to='/teachings' style={{ textDecoration:'none', color:`${path === 'teachings' ? '#f45d48' : 'black'}` }}>
                                <li>Bible Study</li>
                            </Link>

                            <Link to='/gallery' style={{ textDecoration:'none', color:`${path === 'gallery' ? '#f45d48' : 'black'}` }}>
                                <li>Gallery & Events</li>
                            </Link>

                            <Link to='/about' style={{ textDecoration:'none', color:`${path === 'about' ? '#f45d48' : 'black'}` }}>
                                <li>About Us</li>
                            </Link>
                        </ul>
                    </div>
                </div>}
            <div style={{display:'flex'}}>
                <div className="user-credentials">
                    <p>{user?.username}</p>

                    <div className="n-logout" onClick={handleShow}>
                        <img src={`https://ui-avatars.com/api/?name=${user?.username}`} alt=''/>
                        <MdKeyboardArrowDown />
                    </div>

                </div>
                <div className="menu" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? <i className="fa fa-bars"  aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}
                </div>
            </div>
        </div>

        {/*Drawer*/}
        <div className={showMenu ? 'sidebar-active' : 'sidebar'}>

            {!showMenu ? <ul className='sidebar-list'>
                <Link to='/home' style={{ textDecoration:'none', color:`${path === 'home' ? '#f45d48' : '#fff'}` }}>
                    <li>Home</li>
                </Link>

                <Link to='/teachings' style={{ textDecoration:'none', color:`${path === 'teachings' ? '#f45d48' : '#fff'}` }}>
                    <li>Bible Study</li>
                </Link>

                <Link to='/dashboard/' style={{ textDecoration:'none', color:`${path === 'dashboard' ? '#f45d48' : '#fff'}` }}>
                    <li>Dashboard</li>
                </Link>

                <Link to='/gallery' style={{ textDecoration:'none', color:`${path === 'gallery' ? '#f45d48' : '#fff'}` }}>
                    <li>Gallery & Events</li>
                </Link>

                <Link to='/about' style={{ textDecoration:'none', color:`${path === 'about' ? '#f45d48' : '#fff'}` }}>
                    <li>About Us</li>
                </Link>
            </ul> : <div></div>}
        </div>

          {showButton && <div className="logout-menu" onClick={handleLogout}>
              <h6>Logout</h6>
          </div>}
      </>
  )
}

export default Navbar