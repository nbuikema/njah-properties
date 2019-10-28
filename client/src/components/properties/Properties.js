import React, {useState, useEffect} from 'react';
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
            <div className='row'>
                <div className='col-8 p-0 fixed'>
                    <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY} onViewportChange={viewport => {setViewport(viewport)}}>
                        {properties.map(property => (
                            <Marker key={property._id} latitude={Number(property.lat)} longitude={Number(property.long)}>
                                <button class='markerbtn' onClick={changeSelected(`${property._id}`)}>
                                    <div class='marker'></div>
                                </button>
                            </Marker>
                        ))}
                    </ReactMapGL>
                </div>
                <div className='col-4 p-0'>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;