import React from 'react';
import FirstSection from '../components/FirstSection';
import FourthSection from '../components/FourthSection';
import SecondSection from '../components/SecondSection';
import ThirdSection from '../components/ThirdSection';
import FifthSection from "../components/FifthSection";
import SixSection from "../components/SixSection";
import SeventhSection from "../components/SeventhSection";
import EightSection from "../components/EightSection";
import NinethSection from "../components/NinethSection";
import TenthSection from "../components/TenthSection";
import Footer from "../components/Footer";
import FooterExtra from "../components/FooterExtra";
import Arrow from "../components/Arrow";

function Home() {
  return (
      <div style={{width:'100%', overflowX:'hidden'}}>
        <FirstSection  />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixSection />
        <SeventhSection />
        <EightSection />
        <NinethSection />
        <TenthSection />
        <Footer />
        <FooterExtra/>
        <Arrow/>
      </div>
  )
}

export default Home
