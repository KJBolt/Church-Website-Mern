import React from 'react';
import Navbar from '../components/Navbar';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {images} from '../Data';
import Events from "../components/Events";
import PhotoGallery from "../components/PhotoGallery";
import Arrow from '../components/Arrow';

function Gallery() {

  return (
    <div>
        <Navbar />

        <div className="swiper-container">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide 
                        key={image.id} 
                    >
                        <img src={image.image} alt="Network Error" style={{height:'100%', width:'100%', objectFit:'cover'}} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        <div className="container">
            <div className="g-box">
                <div className="g-container shadow-sm">
                    <div className="row">
                        <div className="first col-md-4 col-sm-12 col-12">
                           <div className="wrapper">
                               <div className="title">
                                   <h3>Our Branches</h3>
                               </div>
                               <div className="image">
                                   <img src={require('../assets/pastor1.jpg')} alt=""/>
                               </div>
                               <div className="desc">
                                   <p>
                                       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                       Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                   </p>
                               </div>
                           </div>
                        </div>
                        <div className="first col-md-4 col-sm-12 col-12">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>Church Mission</h3>
                                </div>
                                <div className="image">
                                    <img src={require('../assets/bible3.jpg')} alt=""/>
                                </div>
                                <div className="desc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="first col-md-4 col-sm-12 col-12">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>Teachings</h3>
                                </div>
                                <div className="image">
                                    <img src={require('../assets/bible1.jpg')} alt=""/>
                                </div>
                                <div className="desc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Events />
                    <PhotoGallery />
                </div>
            </div>
        </div>

        <Arrow />
    </div>
  )
}

export default Gallery