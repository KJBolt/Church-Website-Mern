import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { publicRequest } from '../../requestMethods';
import '../../spinner.css';
import { useDispatch, useSelector } from 'react-redux';
import {getAudio} from '../../redux/audioSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fetchsongs({setPlay, setPlaying, ended}) {
    const [loading, setLoading] = useState(false);
    const [audios, setAudios] = useState([]);
    const dispatch = useDispatch();
    const c_audio = useSelector((state) => state.audio.currentAudio.audioLink);
    

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                setLoading(true)
                const res = await publicRequest.get('/audio/random')
                setAudios(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
            }
            
        }

        fetchAudios();
    }, [])

    const handlePlay = (audioLink, audioId) => {
        dispatch(getAudio({audioLink}))
        // setAudio(audioLink);
        setPlay(true);
        setPlaying(audioId)
    }

  return (
    <>
        <ToastContainer autoClose={2000}/>
    
        <div className='fetch-container'>
            {loading ? <div className="loading">Loading...</div> : <>
                {audios.map((audio) => (
                    <div className="fetch-item" key={audio._id} onClick={() => handlePlay(audio.audio, audio._id)}>
                        <div className="left">
                            <p>{audio.title}</p>
                            <p>by {audio.author}</p>
                        </div>
                        <div className="center">
                            {ended !== 'pause' ? 
                            <>{audio.audio === c_audio && ended !== 'ended' &&  <span className='playing'></span>}</> :
                            <>{audio.audio === c_audio && ended === 'pause' &&  <span style={{ color: '#fff', fontWeight: 600 }}>Paused</span>}</>
                        }
                            
                            
                        </div>
                        <div className="right">
                            <p>{moment(audio.time).fromNow()}</p>
                        </div>
                    </div>
                ))}
            </>}
        </div>
    </>
  )
}

export default Fetchsongs
