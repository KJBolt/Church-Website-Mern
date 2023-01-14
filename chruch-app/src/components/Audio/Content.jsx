import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { publicRequest } from '../../requestMethods';
import '../../spinner.css';
import {useDispatch} from 'react-redux';
import {getAudio} from '../../redux/audioSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Content() {
    const [loading, setLoading] = useState(false);
    const [audios, setAudios] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                setLoading(true)
                const res = await publicRequest.get('/audio')
                setAudios(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchAudios();
    }, [])

    const storeAudio = (audioLink) => {
        dispatch(getAudio({audioLink}))
    }

    
  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div className='content-container'>
            {loading ? <div className="loader">Loading...</div> : <>
                {audios.map(audio => (
                    <div className="content-item" key={audio._id} onClick={() => storeAudio(audio.audio)}>
                        <div className="left">
                            <div className="image">
                                <img src={audio.img} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p>{audio.title}</p>
                            <p>{moment(audio.createdAt).fromNow()}</p>
                            <p>by {audio.author}</p>
                        </div>
                    </div>
                ))}
            </>}
        </div>
    </>
  )
}

export default Content
