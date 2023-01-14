import React, {useEffect, useState} from 'react';
import {FaRegComment} from 'react-icons/fa';
import {FaRegEye} from 'react-icons/fa';
import {publicRequest} from "../../requestMethods";
import {Link} from 'react-router-dom';
import '../../spinner.css';
import {useDispatch, useSelector} from "react-redux";
import { getRecentPosts } from '../../redux/postSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecentPost() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const r_recent = useSelector((state) => state.post.recentPosts)

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/teaching/random');
                dispatch(getRecentPosts(res.data))
                setLoading(false);
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        };

        fetchRecent();
    }, [dispatch]);

    // const countlikes = (postId) => {
    //     return user.like.filter((id) => id === postId).length
    // }

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <div className="recent-posts">
                <h6>Recent Posts</h6>
                {loading ? <div className="loader">Loading...</div> :<div className="row">
                        {r_recent && r_recent.map((recentPost) => (
                            <div className="item col-md-4 col-sm-6 col-12" key={recentPost._id}>
                                <Link  to={`/post/${recentPost._id}`} style={{ textDecoration:'none', color:'black' }}>
                                    <div className="image">
                                        <img src={recentPost.img} alt=""/>
                                    </div>
                                    <div className="rp-title">
                                        <p>{recentPost.title}</p>
                                    </div>
                                </Link>

                                <hr/>

                                <div className="rp-action-buttons">
                                    <div className="left">
                                        <div className="first">
                                            <p>0 <FaRegComment style={{fontSize:'15px'}}/></p>
                                        </div>
                                        <div className="second">
                                            <p>{recentPost.views} <FaRegEye style={{fontSize:'20px'}}/></p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <p>{r_recent !== null ? recentPost?.likeCount : 0 } {`${recentPost?.likeCount <= 1 ? 'like' : 'likes'}`}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>}
            </div>
        </>
    );
}

export default RecentPost;