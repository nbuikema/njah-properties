import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';
import {readAllProperties} from './apiProperties';
import ReactMapGL, {Marker} from 'react-map-gl';

const street = 'mapbox://styles/nbuikema/ck29yonjr2o4i1clek9xxypis';
const satellite = 'mapbox://styles/nbuikema/ck29ykm355ffd1cqvb26q1fjv';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [selected, setSelected] = useState(null);
    const [mapType, setMapType] = useState(street)
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
    };

    const changeMapType = event => {
        event.preventDefault();
        if(mapType === street) {
            setMapType(satellite);
        } else {
            setMapType(street);
        }
    };

    return (
        <div>
            {useWindowSize()}
            <div className='row'>
                <div className='col-8 p-0'>
                <button className='map-view' onClick={changeMapType}>{mapType === street ? 'Satellite View' : 'Street View'}</button>
                <button className='map-reset' onClick={changeSelected(null)}>Reset Selected</button>
                    <ReactMapGL {...viewport} mapStyle={mapType} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY} onViewportChange={viewport => {setViewport(viewport)}}>
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
                    {!selected && properties.map(property => (
                        <div key={property._id} className="card">
                            {property.images.length > 0 && <img src={`${property.images[0].url}`} className="card-img-top" alt={`${property.address}`} />}
                            <div className="card-body">
                                <h5 className="card-title">{property.address}</h5>
                                <p className="card-text">{property.city}, {property.state}, {property.zip}</p>
                                <Link className='btn btn-primary' to={`/properties/${property._id}`}>More Info</Link>
                            </div>
                        </div>
                    ))}
                    {selected && properties.map(property => {
                        if(selected === property._id) {
                            return (
                                <div key={property._id} className="card">
                                    {property.images.length > 0 && <img src={`${property.images[0].url}`} className="card-img-top" alt={`${property.address}`} />}
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