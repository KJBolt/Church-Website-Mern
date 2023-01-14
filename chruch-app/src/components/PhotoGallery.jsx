import React from 'react';
import {steachings} from "../Data";

function PhotoGallery() {
    return (
        <>
            <div className='photo-gallery'>
            <h5>Photo Gallery</h5>

                <div className="pg-container">
                    <div className="row">
                        {steachings.map((data) => (
                            <div className="pg-image col-md-4 col-sm-6 col-12" key={data.id}>
                                <img src={data.image} alt=""/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhotoGallery;