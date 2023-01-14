import React, {useState, useEffect} from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import {Link} from "react-router-dom";
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {publicRequest, userRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../spinner.css';


function EventDashboard() {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    // Fetch Event when component mounts
    useEffect(() => {
        const fetchEvents = async() => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/event');
                setEvents(res.data);
                setLoading(false);
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
        }; 
        

        fetchEvents();
    }, []);


    // Delete Event
    const handleDelete = async(id) => {
        try {
            await userRequest.delete(`/event/${id}`);
            setEvents(() => {
                return events.filter((event) => event._id !== id)
            });
            toast.success('Event deleted successfully');
            
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
                                <Link to='/dashboard/create-event' style={{textDecoration:'none'}}>
                                    <div className="db-btn">
                                        <button>Create Event</button>
                                    </div>
                                </Link>


                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Event Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {events && events.map((event) => (
                                        <tr key={event._id}>
                                            <td>{event.title}</td>
                                            <td>{event.date}</td>
                                            <td>{event.time}</td>
                                            <td>{event.location}</td>
                                            <td>
                                                <AiOutlineDelete style={{fontSize: 20, color:'red', marginRight:10, cursor:'pointer'}} onClick={() => handleDelete(event._id)}/>
                                                <Link to={`/events/${event._id}`} style={{textDecoration:'none'}}>
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

export default EventDashboard;