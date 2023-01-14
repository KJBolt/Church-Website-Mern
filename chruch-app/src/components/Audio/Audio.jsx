import React, {useEffect} from 'react';
import Playlist from './Playlist';
import Header from './Header';
import Content from './Content';
import { useDispatch } from 'react-redux';
import { getAudio } from '../../redux/audioSlice';

function Audio() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAudio({audioLink:""}))
  }, [dispatch])
  
  return (
    <div className='container'>
      <div className="audio-title">
        <h5>Audio</h5>
      </div>
      <div className='home-container'>
        <div className="row">
          <div className="left col-md-6 col-sm-12 col-12">
              <Playlist  />
          </div>
          <div className="right  col-md-6 col-sm-12 col-12">
              <Header />
              <Content/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audio
