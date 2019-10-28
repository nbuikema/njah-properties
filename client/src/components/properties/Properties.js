import React, {useState, useEffect, useLayoutEffect} from 'react';
import {readAllProperties} from './apiProperties';
import ReactMapGL, {Marker} from 'react-map-gl';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [selected, setSelected] = useState(null);
    const [viewport, setViewport] = useState({
        longitude: -97.1331,
        latitude: 33.2148,
        width: '100%',
        height: 'calc(100vh - 60px)',
        zoom: 11
    });

    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            setViewport({...viewport, width: '100%', height: 'calc(100vh - 60px)'});
            return () => window.removeEventListener('resize', updateSize);
        }, [size]);
    }

    const getAllProperties = () => {
        readAllProperties().then(data => {
            setProperties(data);
        });
    };

    useEffect(() => {
        getAllProperties();
    }, []);

    const changeSelected = id => event => {
        event.preventDefault();
        setSelected(id);
    }

    return (
        <div>
            {useWindowSize()}
            <div className='row'>
                <div className='col-8 p-0'>
                    <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY} onViewportChange={viewport => {setViewport(viewport)}}>
                        {!selected && properties.map(property => (
                            <Marker key={property._id} latitude={Number(property.lat)} longitude={Number(property.long)}>
                                <button className='markerbtn' onClick={changeSelected(`${property._id}`)}>
                                    <div className='marker'></div>
                                </button>
                            </Marker>
                        ))}
                        {selected && properties.map(property => {
                            if(selected === property._id) {
                                return (
                                    <Marker key={property._id} latitude={Number(property.lat)} longitude={Number(property.long)}>
                                        <button className='markerbtn'>
                                            <div className='marker'></div>
                                        </button>
                                    </Marker>
                                );
                            }
                        })}
                    </ReactMapGL>
                </div>
                <div className='scrolly col-4 p-0'>
                    <div>
                        <button onClick={changeSelected(null)}>Reset Selected</button>
                    </div>
                    {!selected && properties.map(property => (
                        <div key={property._id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{property.address}</h5>
                                <p className="card-text">{property.city}, {property.state}, {property.zip}</p>
                            </div>
                        </div>
                    ))}
                    {selected && properties.map(property => {
                        if(selected === property._id) {
                            return (
                                <div key={property._id} className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{property.address}</h5>
                                        <p className="card-text">{property.city}, {property.state}, {property.zip}</p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Properties;