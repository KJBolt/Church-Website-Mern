import React from 'react';
import Navbar from '../components/Navbar';
import SundayTeachings from '../components/TeachingsContent/SundayTeachings';
import Videos from '../components/Videos';
import Arrow from "../components/Arrow";
import Audio from '../components/Audio/Audio';

function Teachings() {
  return (
    <div>
        <Navbar />
        <SundayTeachings />
        <Videos />
        <Audio />
        <Arrow/>
    </div>
  )
}

export default Teachings