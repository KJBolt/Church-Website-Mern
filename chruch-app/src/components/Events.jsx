import React, {useState, useEffect} from 'react';
import {publicRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/event/recent');
                setEvents(res.data);
                setLoading(false);
            } catch (error) {
                toast.error(error.message)
            }
            
        };

        fetchEvents();
    }, []);


    return (
        <>
            <ToastContainer autoClose={2000}/>
            <div className="event-container">
                <div className="row">
                    <div className="left col-md-4 col-sm-12 col-12 shadow-sm">
                        <div className="image">
                            <img src={require('../assets/bible4.jpg')} alt=""/>
                        </div>

                        <div className="time">
                            <div className="one">
                                <div className="hours">
                                    <p>0</p>
                                </div>
                                <div className="desc">
                                    <p>Days</p>
                                </div>
                            </div>

                            <div className="one">
                                <div className="hours">
                                    <p>00</p>
                                </div>
                                <div className="desc">
                                    <p>Hours</p>
                                </div>
                            </div>

                            <div className="one">
                                <div className="hours">
                                    <p>00</p>
                                </div>
                                <div className="desc">
                                    <p>Minutes</p>
                                </div>
                            </div>

                            <div className="one">
                                <div className="hours">
                                    <p>00</p>
                                </div>
                                <div className="desc">
                                    <p>Seconds</p>
                                </div>
                            </div>

                        </div>

                        <div className="other-details">
                            <div className="title">
                                <p>Sunday Gatherings</p>
                            </div>
                            <div className="desc">
                                <p>On Sundays, at 09:00 AM at</p>
                                <p>Bubiashie Otisahele Street, Ghana</p>
                            </div>
                        </div>

                    </div>
                    <div className="right col-md-8 col-sm-12 col-12">
                        <div className="header">
                            <div className="up-event">
                                <h3>Upcoming Events</h3>
                                <hr className={{width:'10%'}}/>
                            </div>
                        </div>

                        {loading ? <div className="loader">Loading...</div> : <div className="gallery-body">
                            <div className="gb-content">
                                {events.map((event) => (
                                    <div className="gb-left" key={event._id}>
                                        <div className="gb-time">
                                            <p>{event.date.substr(0, 2)}</p>
                                            <p>{event.date.substr(4, 11)}</p>
                                        </div>
                                        <div className="gb-event">
                                            <p>{event.title}</p>
                                            <p><i className="fa fa-clock-o" aria-hidden="true"></i> {event.time}</p>
                                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> {event.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Events;