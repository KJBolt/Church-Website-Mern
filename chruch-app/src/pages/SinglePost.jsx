import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {publicRequest, userRequest} from "../requestMethods";
import '../spinner.css';
import parse from 'html-react-parser';
import RecentPost from "../components/TeachingsContent/RecentPost";
import {AiOutlineHeart} from 'react-icons/ai';
import {getPost} from "../redux/postSlice";
import {useDispatch, useSelector} from "react-redux";
import {BsHeartFill} from 'react-icons/bs';
import { like } from '../redux/postSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SinglePost() {
    const location = useLocation();
    const [teaching, setTeaching] = useState({});
    const [loading, setLoading] = useState(false);
    const path = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.user);
    const r_post = useSelector((state) => state.post.currentPost);

    useEffect(() => {
        const fetchTrending = async() => {
            try {
                setLoading(true);
                const res = await publicRequest(`/teaching/find/${path}`);
                dispatch(getPost(res.data));
                setTeaching(res.data);
                setLoading(false);
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
       
        }
        fetchTrending();
    },[dispatch, path]);


    const handleLike = async (teachingId) => {
        try {
            await userRequest.put(`teaching/like/${teachingId}`);
            dispatch(like(user._id))
        } catch (error) {
            toast.error(error.response.data)
        }
        
    };


  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div className="sp">
            <div className='container'>
                    <div className="sp-header">
                        <div className="header-content">
                            <Link to='/home' style={{ textDecoration: 'none', color:'black' }}>
                                <div className="left">
                                    <h4>Christians</h4>
                                </div>
                            </Link>
                            
                            <Link to='/teachings' style={{ textDecoration: 'none', color:'black' }}>
                                <div className="right">
                                    <h5>Return</h5>
                                </div>
                            </Link>
                            
                        </div>
                    </div>


                    {loading ? <div className="loader">Loading...</div> : <div className="sp-body">
                        <div className="sp-body-wrapper">
                            <div className="sp-title">
                                <h3>{teaching.title}</h3>
                            </div>
                            <div className="sp-image">
                                <img src={teaching.img} alt="" />
                            </div>
                            <div className="sp-icons">
                                <div className="left">
                                    <p>Author: <span>{teaching.author}</span></p>
                                </div>
                                <div className="right">
                                    <div className="like">
                                        {r_post && r_post?.like.includes(user._id) ?
                                            <BsHeartFill
                                                style={{
                                                    fontSize:'22px',
                                                    paddingTop:'5px',
                                                    color:'red',
                                                    marginRight:'7px',
                                                    cursor:'pointer'
                                                }}
                                                onClick={() => handleLike(teaching._id)}
                                            />
                                            :<AiOutlineHeart
                                                style={{
                                                    fontSize:'25px',
                                                    color:'red',
                                                    marginRight:'7px',
                                                    cursor:'pointer'
                                                }}
                                                onClick={() => handleLike(teaching._id)}
                                        />}
                                        <p>{r_post !== null ? r_post?.likeCount : 0}</p>
                                    </div>
                                    <div className="views">
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                        <p>{teaching.views}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sp-desc">
                                <div>{parse(`${teaching.body}`)}</div>
                            </div>

                            <RecentPost/>
                        </div>
                    </div>}
            </div>
        </div>
    </>
  )
}

export default SinglePost