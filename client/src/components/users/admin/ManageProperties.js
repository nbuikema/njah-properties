import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {deleteProperty, updateProperty} from '../apiUsers';
import {readAllProperties} from '../../properties/apiProperties';
import {isAuth} from '../../auth/apiAuth';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState({
        _id: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        rent: '',
        size: '',
        beds: '',
        baths: '',
        info: '',
        available: false,
        createdAt: '',
        updatedAt: '',
        lat: '',
        long: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {_id, address, city, state, zip, rent, size, beds, baths, info, available, createdAt, updatedAt, long, lat} = selectedProperty;
    const {token} = isAuth();

    const getAllProperties = () => {
        readAllProperties().then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                setError('');
                setProperties(data);
            }
        });
    };

    useEffect(() => {
        getAllProperties();
    }, []);

    const selectProperty = event => {
        let selectedId = event.target.value;
        setSuccess(false);
        properties.forEach((property) => {
            if(selectedId === '-1') {
                setSelectedProperty({
                    _id: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    rent: '',
                    size: '',
                    beds: '',
                    baths: '',
                    info: '',
                    available: false,
                    createdAt: '',
                    updatedAt: '',
                    lat: '',
                    long: ''
                });
            }
            if(property._id === selectedId) {
                setSelectedProperty({
                    _id: property._id,
                    address: property.address,
                    city: property.city,
                    state: property.state,
                    zip: property.zip,
                    rent: property.rent,
                    size: property.size,
                    beds: property.beds,
                    baths: property.baths,
                    info: property.info,
                    available: property.available,
                    createdAt: property.createdAt,
                    updatedAt: property.updatedAt,
                    lat: property.lat,
                    long: property.long
                });
                return;
            }
        });
    };

    const changePropertyInfo = selected => event => {
        let value = event.target.value;
        if(selected === 'available') {
            if(value === 'true') {
                value = true;
            } else {
                value = false;
            }
        }
        setError('');
        setSelectedProperty({...selectedProperty, [selected]: value});
    };

    const updatePropertyClick = event => {
        event.preventDefault();
        setError('');
        updateProperty(token, selectedProperty).then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    getAllProperties();
                    setSuccess('updated');
                }
            }
        });
    };

    const deletePropertyClick = event => {
        event.preventDefault();
        const confirmDelete = window.confirm('Are you sure you want to delete this property? This process cannot be undone.');
        if(confirmDelete) {
            deleteProperty(token, selectedProperty).then((data, err) => {
                if(err || !data) {
                    setError('Oops! Something went wrong.');
                } else {
                    if(data.err) {
                        setError(data.err);
                    } else {
                        getAllProperties();
                        setSelectedProperty({
                            _id: '',
                            address: '',
                            city: '',
                            state: '',
                            zip: '',
                            rent: '',
                            size: '',
                            beds: '',
                            baths: '',
                            info: '',
                            available: false,
                            createdAt: '',
                            updatedAt: '',
                            lat: '',
                            long: ''
                        });
                        setSuccess('deleted');
                    }
                }
            });
        }
    };

    const showSelectedPropertyInfo = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="property" className="col-sm-auto col-form-label mr-2"><strong>Which property would you like to manage?</strong></label>
                    <div className="col-sm-auto">
                        <select value={_id} onChange={selectProperty} className="form-control text-primary" id="selectProperty">
                            <option value='-1'>Select Property</option>
                            {properties.map((property, i) => (
                                <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="address" className="col-sm-3 col-form-label"><strong>Address</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('address')} type="text" className="form-control text-primary" id="first_name" value={address} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="city" className="col-sm-3 col-form-label"><strong>City</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('city')} type="text" className="form-control text-primary" id="city" value={city} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="state" className="col-sm-3 col-form-label"><strong>State</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('state')} type="text" className="form-control text-primary" id="state" value={state} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="zip" className="col-sm-3 col-form-label"><strong>Zip</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('zip')} type="text" className="form-control text-primary" id="zip" value={zip} />
                    </div>
                </div>
                <div className='col-12 ml-1'><small>Want to make the property more accurate on the map? These values were geocoded when you first added the property, but they aren't always perfect. We don't recommend you change <strong>latitude</strong> or <strong>longitude</strong> unless you know more precise coordinates. This change cannot be undone.</small></div>
                <div className="form-group mt-2 col-12 col-lg-6 row form-row">
                    <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Latitude</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('lat')} type="text" className="form-control text-primary" id="id" value={lat} />
                    </div>
                </div>
                <div className="form-group mt-lg-2 col-12 col-lg-6 row form-row">
                    <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Longitude</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('long')} type="text" className="form-control text-primary" id="id" value={long} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="rent" className="col-sm-3 col-form-label"><strong>Rent</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('rent')} type="number" className="form-control text-primary" id="rent" value={rent} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="size" className="col-sm-3 col-form-label"><strong>Size (Sq Ft)</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('size')} type="number" className="form-control text-primary" id="size" value={size} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="beds" className="col-sm-3 col-form-label"><strong>Beds</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('beds')} type="number" className="form-control text-primary" id="beds" value={beds} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="baths" className="col-sm-3 col-form-label"><strong>Baths</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('baths')} type="number" className="form-control text-primary" id="baths" value={baths} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="info" className="col-12 col-form-label"><strong>Additional Info - <small>Feel free to let visitors know anything else you think is important. Be descriptive!</small></strong></label>
                    <div className="col-12">
                        <textarea onChange={changePropertyInfo('info')} className="form-control text-primary" id="info" rows='4' value={info}></textarea>
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="available" className="col-sm-auto col-form-label"><strong>Is this property currently available?</strong></label>
                    <div className="col-sm-auto mt-2">
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} checked={available === true ? true : false} className="form-check-input" type="radio" name="available" id="availableyes" value="true" />
                            <label className="form-check-label text-primary" htmlFor="availableyes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} checked={available === false ? true : false} className="form-check-input" type="radio" name="available" id="availableno" value="false" />
                            <label className="form-check-label text-primary" htmlFor="availableno">No</label>
                        </div>
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Added</strong></label>
                    <div className="col-sm-9">
                        <input type="text" disabled className="form-control text-primary" id="id" value={createdAt ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') : ''} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Updated</strong></label>
                    <div className="col-sm-9">
                        <input type="text" disabled className="form-control text-primary" id="id" value={updatedAt ? moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a') : ''} />
                    </div>
                </div>
                <div className='col-12 text-center'>
                    <button onClick={updatePropertyClick} type='submit' className='btn btn-primary mr-2'>Update Property</button>
                    <button onClick={deletePropertyClick} className='btn btn-danger ml-2'>Remove Property</button>
                </div>
            </div>
        </form>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            Property was successfully {success}.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Manage Properties</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {showSelectedPropertyInfo()}
        </div>
    );
};

export default ManageProperties;