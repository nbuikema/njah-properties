import React, {useState, useEffect} from 'react';
import {readProperty} from './apiProperties';

const Property = ({match}) => {
    const [property, setProperty] = useState({});

    const getProperty = propertyId => {
        readProperty(propertyId).then(data => {
            setProperty(data);
        });
    };

    useEffect(() => {
        getProperty(match.params.propertyId);
    }, [match.params.propertyId]);

    return (
        <div>
            {JSON.stringify(property)}
        </div>
    );
}

export default Property;