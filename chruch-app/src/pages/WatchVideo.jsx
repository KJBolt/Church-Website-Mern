import React from 'react';
import Navbar from '../components/Navbar';
import VideoContent from '../components/VideoContent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WatchVideo() {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <Navbar />

      <VideoContent toast={toast}/>
    </div>
  )
}

export default WatchVideo
