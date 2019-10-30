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
            <ol className="carousel-indicators">
                {property.images.map((image, i) => {
                    return i === 0 ? (
                        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className="active"></li>
                    ) : (
                        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i}></li>
                    );
                })}
            </ol>
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
        </div>
    );

    return (
        <div>
            <div className='row'>
                <div className='col-sm-12 col-md-8'>
                    {property._id && showImages()}
                </div>
                <div className='col-sm-12 col-md-4'>

                </div>
            </div>
        </div>
    );
}

export default Property;