import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserDetails from "./UserDetails";
import {publicRequest} from "../../requestMethods";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Details() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const res = await publicRequest.get('/teaching/trend');
                setPosts(res.data)
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        };

        fetchPosts();
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000}/>
            
            <div className='dcontainer'>
                <div className="dwrapper">
                    <div className="row">
                        <div className="dleft col-md-4 col-sm-12 col-12">
                            <div className="dtitle">
                                <h6>New Members</h6>
                                <Link to='/dashboard/users' style={{textDecoration:'none'}}>
                                    <button className='dbtn'>View All</button>
                                </Link>
                            </div>

                            <UserDetails/>
                        </div>
                        <div className="dright col-md-7 col-sm-12 col-12">
                            <div className="dtitle">
                                <h6>Latest Posts</h6>
                                <Link to='/dashboard/posts' style={{textDecoration:'none'}}>
                                    <button className='dbtn'>View All</button>
                                </Link>

                            </div>

                            <div className="post-details">
                                <table className="table caption-top">
                                    <thead>
                                    <tr>
                                        <th scope="col">User</th>
                                        <th scope="col">Post</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {posts.map((post) => (
                                        <tr key={post._id}>
                                            <td>{post.author}</td>
                                            <td>{post.title}</td>
                                            <td>{moment(post.createdAt).fromNow()}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;