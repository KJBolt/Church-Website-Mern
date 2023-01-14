import React, {useState, useEffect} from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineArrowDown} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { userRequest } from '../../requestMethods';

function Home() {
    const [users, setUsers] = useState([])
    const [userPerc, setUserPerc] = useState(0)
    const [teachings, setTeachings] = useState([])
    const [teachingPerc, setTeachingPerc] = useState(0)
    const [videos, setVideos] = useState([])
    const [videoPerc, setVideoPerc] = useState(0)

    useEffect(() => {
        const fetchUserStat = async () => {
            try {
                const res = await userRequest.get('/user/stats');
                setUsers(res.data);
                setUserPerc(res.data.length === 3 ? res.data[2].total * 100 / res.data[1].total -100 : res.data[1].total * 100 / res.data[0].total -100); 
            } catch (error) {
                toast.error('Error fetching user stats')
            }
            
        }

        fetchUserStat()
    }, [])

        useEffect(() => {
            const fetchTeachingStat = async () => {
                try {
                    const res = await userRequest.get('/teaching/get/stats');
                    setTeachings(res.data);
                    setTeachingPerc(res.data.length === 3 ? res.data[2].total * 100 / res.data[1].total -100 : res.data[1].total * 100 / res.data[0].total -100);
                } catch (error) {
                    toast.error('Error fetching teaching stats')  
                }
                
                
            }

            fetchTeachingStat()
        }, [])

        useEffect(() => {
            const fetchVideoStat = async () => {
                try {
                    const res = await userRequest.get('/video/get/stats');
                    setVideos(res.data);
                    setVideoPerc(res.data.length === 3 ? res.data[2].total * 100 / res.data[1].total -100 : res.data[1].total * 100 / res.data[0].total -100);
                } catch (error) {
                    toast.error('Error fetching video stats')
                }
                
            }

            fetchVideoStat()
        }, [])

    return (
        <>

            <div className="increment">
                <div className="row">
                    <div className="inc-left col-sm-4 col-12 shadow-sm">
                        <h5>New Users</h5>

                        <div className="inc-left-content">
                            <p>{users.length === 3 ? users[2]?.total : users[1]?.total}</p>
                            <p>{Math.floor(userPerc)}% {userPerc > 0 ? <AiOutlineArrowUp style={{color: 'green', fontSize:20}}/> : <AiOutlineArrowDown style={{color: 'red', fontSize:20}}/>}</p>
                        </div>

                        <p>Compared to last month</p>
                    </div>


                    <div className="inc-right col-sm-4 col-12 shadow-sm">
                        <h5>New Posts</h5>

                        <div className="inc-right-content">
                        <p>{teachings?.length === 3 ? teachings[2]?.total : teachings[1]?.total}</p>
                            <p>{Math.floor(teachingPerc)}% {teachingPerc > 0 ? <AiOutlineArrowUp style={{color: 'green', fontSize:20}}/> : <AiOutlineArrowDown style={{color: 'red', fontSize:20}}/>}</p>
                        </div>

                        <p>Compared to last month</p>
                    </div>


                    <div className="inc-right col-sm-4 col-12 shadow-sm">
                        <h5>New Videos</h5>

                        <div className="inc-right-content">
                        <p>{videos?.length === 3 ? videos[2]?.total : videos[1]?.total}</p>
                            <p>{Math.floor(videoPerc)}% {videoPerc && videoPerc > 0 ? <AiOutlineArrowUp style={{color: 'green', fontSize:20}}/> : <AiOutlineArrowDown style={{color: 'red', fontSize:20}}/>}</p>
                        </div>

                        <p>Compared to last month</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;