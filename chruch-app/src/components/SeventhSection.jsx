import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

function SeventhSection() {
    return (
        <div style={{height:'auto'}}>
            <div className="sv-content">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={true}
                    loop={true}
                    modules={[Autoplay,Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='slider'>
                        <p className='slider-title'>"I can do everything through <br/>  Christ who gives me strength"</p>
                        <p className='slider-subtitle'>Phillipeans 4:13</p>
                    </SwiperSlide>

                    <SwiperSlide className='slider'>
                        <p className='slider-title'>“GIVE THANKS TO THE LORD FOR <br/>  HE IS GOOD: HIS LOVE ENDURES FOREVER."</p>
                        <p className='slider-subtitle'>PSALM 107:1</p>
                    </SwiperSlide>

                    <SwiperSlide className='slider'>
                        <p className='slider-title'>“CASTING ALL YOUR ANXIETIES ON <br/> HIM, BECAUSE HE CARES FOR YOU.”</p>
                        <p className='slider-subtitle'>1 PETER 5:7</p>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
}

export default SeventhSection;