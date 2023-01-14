import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import {useNavigate} from 'react-router-dom';
import Sidebar from "../components/Dashboard/Sidebar";
import {userRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleUpload = async() => {
        try {
            if (title === '' || date === '' || time === '' || location === '') {
                toast.error('Please fill the forms correctly');
            } else {
                await userRequest.post('/event', {title:title, date:date, time:time, location:location});
                toast.success('Event created successfully');
                setTimeout(() => {
                    navigate('/dashboard/events');
                }, 3000)
            }
        } catch (error) {
            toast.error(`${error.response.data}`)
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
                                        <h6>Create Event</h6>
                                    </div>

                                    <div className="eu-form">
                                        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                                        <input type="text" placeholder='Enter a date in this formart 18th Dec, 2022' onChange={(e) => setDate(e.target.value)}/>
                                        <input type="time" onChange={(e) => setTime(e.target.value)}/>
                                        <input type="text" placeholder='Location' onChange={(e) => setLocation(e.target.value)}/>
                                        <input className='eu-btn' type="button" value='Submit' onClick={handleUpload}/>
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

export default CreateEvent;