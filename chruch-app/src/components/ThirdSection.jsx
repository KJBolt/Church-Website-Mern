import React from 'react'

function ThirdSection() {
  return (
    <div style={{ height:'auto', background:'#f8f5f2' }}>
      <div className="container">
        <div className="tc-wrapper">
            <div className="tc-title">
                <h5>MINISTRIES</h5>
            </div>

            <div className="row">
                <div
                    className="left col-lg-6 col-md-12 col-sm-12 col-12"
                    data-aos="fade-right"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                >
                    <div className="image">
                        <img src={require('../assets/prayer.jpeg')} alt="" />
                    </div>
                </div>
                <div className="right col-lg-6 col-md-12 col-sm-12 col-12">
                    <div
                        className="right-content"
                        data-aos="fade-left"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                    >
                        <div className="headings">
                            <h5>Bible</h5>
                            <h5>Teachings</h5>
                        </div>

                        <div className="author">
                            <p>BISHOP JOHN ROCKSON</p>
                        </div>

                        <div className="desc">
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae odit magnam sint, quae rem est in hic! Aut consectetur, 
                                repudiandae reprehenderit dolore asperiores corporis? Cum, 
                                rem optio at consequatur modi dolorum fugiat aspernatur, voluptate dolor nihil blanditiis quos saepe dolorem.
                            </p>
                            
                        </div>

                        <div className="footer">
                            TUESDAY, 7PM-9PM
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdSection
