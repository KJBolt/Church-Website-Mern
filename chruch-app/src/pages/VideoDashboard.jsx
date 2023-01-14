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

function VideoDashboard() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async() => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/video/trend');
                setVideos(res.data);
                setLoading(false);
            } catch (error) {
                toast.error(error.message)
            }
        };

        fetchVideos();
    }, []);


    const handleDelete = async (id) => {
        try {
            await userRequest.delete(`/video/${id}`);
            setVideos(() => {
                return videos.filter((video) => video._id !== id)
            });
            toast.success('Video deleted successfully');
        } catch (error) {
           toast.error(error.message); 
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
                                <Link to='/dashboard/create-video' style={{textDecoration:'none'}}>
                                    <div className="db-btn">
                                        <button>Create Video</button>
                                    </div>
                                </Link>


                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Author</th>
                                        <th scope="col">Video Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {videos.map((video) => (
                                        <tr key={video._id}>
                                            <td>{video.username}</td>
                                            <td>{video.title}</td>
                                            <td>{moment(video.createdAt).fromNow()}</td>
                                            <td>
                                                <AiOutlineDelete style={{fontSize: 20, color:'red', marginRight:10, cursor:'pointer'}} onClick={() => handleDelete(video._id)}/>
                                                <Link to={`/posts/${video._id}`} style={{textDecoration:'none'}}>
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
  )
}

export default VideoDashboard
