import React from 'react'

function FourthSection() {
  return (
    <div style={{ height:'auto' }}>
        <div className="container">
            <div className="fc-content">
                <div className="row">
                    <div
                        className="left col-lg-6 col-md-12 col-sm-12 col-12"
                        data-aos="fade-right"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                    >
                            <div className="fc-headings">
                                <h5>Prayer</h5>
                                <h5>& Sermon</h5>
                            </div>

                            <div className="fc-author">
                                <p>BISHOP JOHN ROCKSON</p>
                            </div>

                            <div className="fc-desc">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae odit magnam sint, quae rem est in hic! Aut consectetur, 
                                    repudiandae reprehenderit dolore asperiores corporis? Cum, 
                                    rem optio at consequatur modi dolorum fugiat aspernatur, voluptate dolor nihil blanditiis quos saepe dolorem.
                                </p>
                                
                            </div>

                            <div className="fc-footer">
                                SUNDAY, NOVEMBER 22, 2022
                            </div>
                    </div>
                    <div
                        className="right col-lg-6 col-md-12 col-sm-12 col-12"
                        data-aos="fade-left"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                    >
                        <div className="fc-image">
                            <img src={require('../assets/worship.jpeg')} alt="" />
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FourthSection
