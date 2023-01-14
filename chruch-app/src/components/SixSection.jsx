import React from 'react';

function SixSection() {
    return (
        <div style={{height:'auto'}}>
            <div className="container">
                <div className="sx-content">
                    <div
                        className="sx-title"
                        data-aos="fade-up"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                    >
                        <h5>Jesus Christ is God</h5>
                    </div>

                    <div
                        className="video-container"
                        data-aos="fade-up"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                    >
                        <iframe
                            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2Fpapa.ike.980%2Fvideos%2F663149874529181%2F&show_text=false&width=560&t=0"
                            width="560" height="314" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            title="myFrame"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SixSection;