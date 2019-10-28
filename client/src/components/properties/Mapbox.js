import React from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";

import markerImg from './marker.svg';

const Mapbox = ({properties}) => {
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
        <Map style="mapbox://styles/mapbox/streets-v8" zoom={zoom} center={center} containerStyle={{position: "fixed", height: "100vh", width: "100%"}}>
            <Layer type="symbol" id="marker" layout={layoutLayer} images={images} onMouseEnter={() => {console.log('entered')}}>
                {properties.map((property, i) => {
                    let coordinates = [Number(property.long), Number(property.lat)];
                    return (
                        <Feature key={i} coordinates={coordinates} onClick={() => {console.log(property._id)}} />
                    );
                })}
            </Layer>
        </Map>
    );
};

export default Mapbox;