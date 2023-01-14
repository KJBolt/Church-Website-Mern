import React from 'react';

function EightSection(props) {
    return (
        <div style={{height:'auto'}}>
            <div className="container">
                <div className="eg-content">
                    <div className="title">
                        <p>Pastors</p>
                    </div>

                    <div className="subtitle">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dicta, eum fugiat porro quae qui!</p>
                    </div>

                    <div className="avatars">
                        <div className="wrapper">
                            <div className="container">
                                <div className="image-container">
                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='100'
                                        data-aos-duration="1000"
                                    >
                                        <img src={require('../assets/pastor1.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Bishop</p>
                                            <p>John Bolt</p>
                                        </div>
                                    </div>

                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='100'
                                        data-aos-duration="1000"
                                    >
                                        <img src={require('../assets/pastor2.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Pastor</p>
                                            <p>Joana Boadu</p>
                                        </div>
                                    </div>

                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='100'
                                        data-aos-duration="1000"
                                    >
                                        <img src={require('../assets/pastor3.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Pastor</p>
                                            <p>Elizabeth Okyere</p>
                                        </div>
                                    </div>

                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='300'
                                        data-aos-duration="1000"
                                    >
                                        <img src={require('../assets/pastor4.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Pastor</p>
                                            <p>Kenneth Rockson</p>
                                        </div>
                                    </div>

                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='300'
                                        data-aos-duration="800"
                                    >
                                        <img src={require('../assets/pastor5.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Pastor</p>
                                            <p>Cecilia Danso</p>
                                        </div>
                                    </div>

                                    <div
                                        className="image1 col-md-3 col-sm-4 col-12"
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay='300'
                                        data-aos-duration="800"
                                    >
                                        <img src={require('../assets/pastor6.jpg')} alt=""/>
                                        <div className="details">
                                            <p>Pastor</p>
                                            <p>Elvis Essel</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EightSection;