import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import {publicRequest, userRequest} from "../requestMethods";
import {useLocation, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEvent() {
    const [event, setEvent] = useState({});
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const loc = useLocation();
    const navigate = useNavigate();
    const path = loc.pathname.split('/')[2];

    useEffect(() => {
        const fetchEvent = async() => {
            try {
                const res = await publicRequest.get(`/event/find/${path}`);
                setEvent(res.data)
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
        };

        fetchEvent();
    },[path]);

    const handleUpdate = async () => {
        try {
            if (title === '' || date === '' || time === '' || location === '') {
                toast.error('Please fill the forms correctly');
            } else {
                await userRequest.put(`/event/${path}`, {title:title, time:time, location:location, date:date});
                toast.success('Event Updated successfully');
                setTimeout(() => {
                    navigate('/dashboard/events')
                }, 3000)
            }
        } catch (error) {
            toast.error(`${error.response.data.message}`)
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
                        <div className="right col-md-9 col-sm-12 col-12">
                            <div className="eu-container">
                                <div className='eu-wrapper'>
                                    <div className="eu-title">
                                        <h6>Edit Event</h6>
                                    </div>

                                    <div className="eu-form">
                                        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} defaultValue={event?.title} />
                                        <input type="text" placeholder='Enter a date in this formart 18th Dec, 2022'  onChange={(e) => setDate(e.target.value)}/>
                                        <input type="time"  onChange={(e) => setTime(e.target.value)}/>
                                        <input type="text" placeholder='Location' defaultValue={event?.location} onChange={(e) => setLocation(e.target.value)}/>
                                        <input className='eu-btn' type="button" value='Update' onClick={handleUpdate}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditEvent;