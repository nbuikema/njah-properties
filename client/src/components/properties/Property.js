import React, {useState, useEffect} from 'react';
import {readProperty} from './apiProperties';

const Property = ({match}) => {
    const [property, setProperty] = useState({});

    const getProperty = propertyId => {
        readProperty(propertyId).then(data => {
            setProperty(data[0]);
        });
    };

    useEffect(() => {
        getProperty(match.params.propertyId);
    }, [match.params.propertyId]);

    const showImages = () => (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {property.images.map((image, i) => {
                    return i === 0 ? (
                        <div key={i} className="carousel-item active">
                            <img src={`${image.url}`} className="d-block w-100" alt="..." />
                        </div>
                    ) : (
                        <div key={i} className="carousel-item">
                            <img src={`${image.url}`} className="d-block w-100" alt="..." />
                        </div>
                    );
                })}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            <ol className="carousel-indicators">
                {property.images.map((image, i) => {
                    return i === 0 ? (
                        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className="active">
                            <img src={`${image.url}`} className="d-block w-100" alt="..." />
                        </li>
                    ) : (
                        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i}>
                            <img src={`${image.url}`} className="d-block w-100" alt="..." />
                        </li>
                    );
                })}
            </ol>
        </div>
    );

    return (
        <div className='text-primary my-4'>
            <div className='container'>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-md-8 order-1 order-md-0'>
                        {property._id && showImages()}
                    </div>
                    <div className='col-sm-12 col-md-4 order-0 order-md-1'>
                        <h2><strong>{property.address}</strong></h2>
                        <h4><em>{property.city}, {property.state}, {property.zip}</em></h4>
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
            </div>
        </div>
    );
}

export default Property;