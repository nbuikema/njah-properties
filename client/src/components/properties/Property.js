import React, {useState, useEffect} from 'react';
import {readProperty} from './apiProperties';

const Property = ({match}) => {
    const [property, setProperty] = useState({});
    const [error, setError] = useState('');

    const getProperty = propertyId => {
        readProperty(propertyId).then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                setError('');
                setProperty(data[0]);
            }
        });
    };

    useEffect(() => {
        getProperty(match.params.propertyId);
    }, [match.params.propertyId]);

    const showImages = () => (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {property.images.length > 0 ? property.images.map((image, i) => {
                    return i === 0 ? (
                        <div key={i} className="carousel-item active no-border">
                            <img src={`${image.url}`} className="d-block m-auto" alt="..." />
                        </div>
                    ) : (
                        <div key={i} className="carousel-item no-border">
                            <img src={`${image.url}`} className="d-block m-auto" alt="..." />
                        </div>
                    );
                }) : (
                    <div className="carousel-item active no-border">
                        <img src='https://res.cloudinary.com/njah-properties/image/upload/v1587054014/njah_properties/comingsoon_q2hb1p.jpg' className="d-block w-100" alt="..." />
                    </div>
                )}
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <ol className="carousel-indicators row">
                {property.images.length > 0 && property.images.map((image, i) => {
                    return i === 0 ? (
                        <li className='car-imgs col-2 px-0 mb-0 active' key={i} data-target="#carouselExampleIndicators" data-slide-to={i}>
                            <img src={`${image.url}`} className="d-block h-100 m-auto" alt="..." />
                        </li>
                    ) : (
                        <li className='car-imgs col-2 px-0 mb-0' key={i} data-target="#carouselExampleIndicators" data-slide-to={i}>
                            <img src={`${image.url}`} className="d-block h-100 m-auto" alt="..." />
                        </li>
                    );
                })}
            </ol>
        </div>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    return (
        <div className='text-primary my-4'>
            <div className='container'>
                <br />
                {showError()}
                {property._id && (
                    <div className='row'>
                        <div className='col-sm-12 col-lg-8 order-1 order-lg-0'>
                            {showImages()}
                        </div>
                        <div className='col-sm-12 col-lg-4 order-0 order-lg-1'>
                            <h2>{property.address}{property.address2 ? `, ${property.address2}` : null}</h2>
                            <h4>{property.city}, {property.state}, {property.zip}</h4>
                            <hr />
                            <h6><strong>{property.available === true ? 'Available' : 'Not Available'}</strong></h6>
                            <h6><strong>Rent:</strong> {property.available === true ? `$${property.rent}` : 'N/A'}</h6>
                            <h6><strong>Size:</strong> {property.size} Sq Ft</h6>
                            <h6><strong>Beds:</strong> {property.beds}</h6>
                            <h6><strong>Baths:</strong> {property.baths}</h6>
                            <h6><strong>Additional Info:</strong></h6>
                            <p>{property.info}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Property;