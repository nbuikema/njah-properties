import React from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";

import markerImg from './marker.svg';

const Properties = () => {
    const Map = ReactMapboxGl({
        minZoom: 9,
        maxZoom: 16,
        accessToken: process.env.REACT_APP_MAPBOX_KEY
    });
    const zoom = [11.5];
    const center = [-97.1031, 33.2148];
    const layoutLayer = {'icon-image': 'marker'};
    const image = new Image();
    image.src = markerImg;
    const images = ['marker', image];

    return (
        <div>
            <div className='row'>
                <div className='col-8 p-0 fixed'>
                    <Map style="mapbox://styles/mapbox/streets-v8" zoom={zoom} center={center} containerStyle={{position: "fixed", height: "100vh", width: "100%"}}>
                        <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
                            <Feature coordinates={[-97.110277, 33.219144]}/>
                        </Layer>
                    </Map>
                </div>
                <div className='col-4 p-0'>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;