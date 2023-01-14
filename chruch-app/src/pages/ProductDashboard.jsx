import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import {Link} from "react-router-dom";
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {publicRequest, userRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import '../spinner.css';

function ProductDashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch posts once on load
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/teaching/dashboardTeachings');
                setPosts(res.data);
                setLoading(false)  
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        };

        fetchPosts();
    }, []);


    // Delete Post
    const handleDelete = async (id) => {
        try {
            await userRequest.delete(`/teaching/${id}`);
            setPosts(() => {
                return posts.filter((post) => post._id !== id)
            })
            toast.success('Post deleted successfully');
        } catch (error) {
            toast.error(error.response.data)
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
                                <Link to='/dashboard/create-post' style={{textDecoration:'none'}}>
                                    <div className="db-btn">
                                        <button>Create Post</button>
                                    </div>
                                </Link>


                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Author</th>
                                        <th scope="col">Post Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {posts.map((post) => (
                                        <tr key={post._id}>
                                            <td>{post.author}</td>
                                            <td>{post.title}</td>
                                            <td>{moment(post.createdAt).fromNow()}</td>
                                            <td>
                                                <AiOutlineDelete style={{fontSize: 20, color:'red', marginRight:10, cursor:'pointer'}} onClick={() => handleDelete(post._id)}/>
                                                <Link to={`/posts/${post._id}`} style={{textDecoration:'none'}}>
                                                    <AiOutlineEdit style={{fontSize: 20, color:'green', cursor:'pointer'}}/>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
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

export default ProductDashboard;