import React, {useState, useEffect} from 'react';
import {BsShare} from 'react-icons/bs';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Fetchsongs from './Fetchsongs';
import { useSelector } from 'react-redux';

function Playlist() {
  const [play, setPlay] = useState(null);
  const [playing, setPlaying] = useState('');
  const [ended, setEnded] = useState('');
  const c_audio = useSelector((state) => state.audio.currentAudio.audioLink);

  useEffect(() => {
    setPlay(false)
  }, [])


  return (
    <div className='playlist'>
      <div className="playlist-header">
        <div className='playlist-title'>
            <h6>Audio Sermons</h6>
        </div>
        <div className='share-icon'>
            <BsShare style={{color:'#fff'}}/>
        </div>
      </div>
      <div className="playlist-body">
        <div className='image'>
            <img src={require('../../assets/bible.jpeg')} alt="" />
        </div>
        <div className='mp3-player'>
            {play ? 
              <AudioPlayer
                  autoPlay
                  src={c_audio !== '' ? c_audio : ''}
                  onPlay={e => setEnded(e.type)}
                  onEnded={(e) => setEnded(e.type)}
                  onPause={(e) => setEnded(e.type)}
                  style={{ height:'100%', width:'100%', backgroundColor: '#f2f2f2', color:'#fff', border: 'none' }}
              /> : 
              <AudioPlayer
                  autoPlay
                  src=''
                  style={{ height:'100%', width:'100%', backgroundColor: '#f2f2f2', color:'#fff', border: 'none' }}
              />
            }
        </div>
      </div>

      <div>
            <Fetchsongs 
              setPlay={setPlay} 
              playing={playing} 
              setPlaying={setPlaying}
              ended={ended} 
              setEnded={setEnded}
            />
        </div>
    </div>
  )
}

export default Playlist
