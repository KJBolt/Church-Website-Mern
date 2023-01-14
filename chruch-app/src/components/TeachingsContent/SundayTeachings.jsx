import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {publicRequest} from "../../requestMethods";
import parse from 'html-react-parser';
import {RxDotsVertical} from 'react-icons/rx';
import {FaRegComment} from 'react-icons/fa';
import {FaRegEye} from 'react-icons/fa';
import '../../spinner.css';
import { getAllPosts } from '../../redux/postSlice';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SundayTeachings() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const dispatch = useDispatch();
    const r_post = useSelector((state) => state.post.getPosts);

    useEffect(() => {
        const fetchTeachings = async() => {
            try {
                setLoading(true);
                const res = await publicRequest.get(`/teaching/all?page=${page}`);
                dispatch(getAllPosts(res.data))
                setLoading(false); 
            } catch (error) {
                toast.error(error.message)
                console.log(error.message)
            }
            
        };
        fetchTeachings();
    }, [dispatch, page]);

    useEffect(() => {
        if (r_post) {
            setPageCount(r_post?.pagination.pageCount)
        }
    }, [r_post])

    // Pagination Logic
    const handlePrev = () => {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1
        })
    }

    const handleNext = () => {
        setPage((p) => {
            if (p === pageCount) return p;
            return p + 1
        })
    }



  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div className='container'>
            <div className="st-wrapper">
                <div className="title">
                    All Posts
                </div>

                <div className="pagination-buttons">
                        <div>
                            <button disabled={page === 1} onClick={handlePrev}>Prev</button>
                            <button disabled={page >= pageCount} onClick={handleNext}>Next</button>
                        </div>
                </div>
                
                {loading ? <div className="loader">Loading...</div> : <div className="st-content">
                    <div className="row">
                        {r_post?.items.length === 0 ? <p className='no-content'>No Result found</p> :
                        <>
                            {r_post?.items.map((teaching) => (
                                <div className="content col-lg-4 col-md-6 col-sm-6 col-12" key={teaching._id}>

                                    <div className="content-wrapper">
                                        <Link  to={`/post/${teaching._id}`} style={{ textDecoration:'none', color:'black' }}>
                                            <div className="image">
                                                <img src={teaching.img} alt="Network Error" />
                                            </div>
                                        </Link>
                                        <div className="author-details">
                                            <div className="left">
                                                <div className="first">
                                                    <img src={require('../../assets/pastor1.jpg')} alt=""/>
                                                </div>
                                                <div className="second">
                                                    <p>{teaching.author}</p>
                                                    <p>{moment(teaching.createdAt).fromNow()}</p>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <RxDotsVertical />
                                            </div>
                                        </div>

                                        <Link  to={`/post/${teaching._id}`} style={{ textDecoration:'none', color:'black' }}>
                                            <div className="desc-title">
                                                <p>{teaching.title}</p>
                                            </div>

                                            <div className="desc">
                                                <div>{parse(teaching.body.substr(0, 80))}</div>
                                            </div>
                                        </Link>

                                        <hr/>

                                        <div className="action-buttons">
                                            <div className="left">
                                                <div className="first">
                                                    <p>0 <FaRegComment style={{fontSize:'18px'}}/></p>
                                                </div>
                                                <div className="second">
                                                    <p><FaRegEye style={{fontSize:'22px'}}/></p>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <p>{r_post !== null ? teaching?.likeCount : 0} {`${teaching?.likeCount <= 1 ? 'like' : 'likes'}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        }
                    </div>

                    
                </div>}
            </div>
        </div>
    </>
  )
}

export default SundayTeachings