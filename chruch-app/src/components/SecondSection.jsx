import React from 'react';

function SecondSection(props) {
    return (
        <div style={{height:'auto'}}>
            <div className="container">
                <div className="sc-content">
                    <div className="title">
                        <h5>Our Church</h5>
                    </div>
                    <div
                        className="sc-body"
                        data-aos="fade-up"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="500"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci asperiores beatae distinctio harum hic laborum nisi rerum ullam.
                            Accusantium ad aliquid at beatae culpa delectus deleniti dolores earum eius,
                            esse eum illum itaque laborum laudantium,
                            libero maiores nobis omnis perspiciatis porro quam reiciendis
                            rem repellendus, veniam voluptate voluptates? Blanditiis, porro?
                        </p>
                    </div>
                    <div
                        className="sc-image"
                        data-aos="fade-up"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="500"
                    >
                        <img src={require('../assets/bible3.jpg')} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondSection;