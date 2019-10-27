import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

const API = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = API;
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-97.1031, 33.2248],
                zoom: 11.5
            });
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };
        if(!map) {
            initializeMap({ setMap, mapContainer });
        }
    }, [map]);

    return <div id="map" ref={el => (mapContainer.current = el)} />;
};

export default Map;