import React from 'react';
import { Link } from 'react-router-dom';
import FooterExtra from '../components/FooterExtra';
import Navbar from '../components/Navbar';


function About() {
  return (
    <div>
        <Navbar />

        <div className="container shadow-sm" style={{ marginBottom:'20px' }}>
          <div className="about-wrapper">
            <div className="row">
              <div className="ab-left col-md-6 col-sm-12 col-12">
                <div className="ab-content">
                  <h2>Who we are</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Eos officiis amet cum quas eum tempora. Asperiores in assumenda consectetur consequuntur 
                    laudantium nobis. Dolores voluptatum quia itaque error quaerat impedit earum nemo dolorem 
                    assumenda quas minima eveniet deserunt eius delectus, nobis quasi blanditiis accusamus? 
                    Laudantium deserunt fuga adipisci cupiditate quo. Quibusdam!
                  </p>

                  <Link to='/teachings'>
                    <button>Study with us</button>
                  </Link>
                  
                </div>
              </div>
              <div className="ab-right col-md-6 col-sm-12 col-12">
                <div className="ab-image">
                  <img src={require('../assets/pastor1.jpg')} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="ab-location">
            <div className="row">
              <div className="left col-md-6 col-sm-12 col-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1985.4711729745216!2d-0.24229374202474913!3d5.575542498989416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf99e9a654e43f%3A0xe08cf25020c1bb45!2sOtisahele%20St%2C%20Accra!5e0!3m2!1sen!2sgh!4v1671225494401!5m2!1sen!2sgh"
                     style={{border:0, height:300, width:'100%'}} allowFullScreen="" loading="lazy" title='map'
                    referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="right col-md-6 col-sm-12 col-12">
                <div className="title">
                  <h3>Contact Us</h3>
                  <p>The Christians Main-Branch</p>
                  <p>P.O.Box 1673 Dansoman-Estate, Accra</p>
                  <p>0265896378, 0509912663</p>
                  <p>Otisahele-Street, Accra</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterExtra />
    </div>
  )
}

export default About