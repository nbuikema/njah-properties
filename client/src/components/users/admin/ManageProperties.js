import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {createProperty, deleteProperty} from '../apiUsers';
import {readAllProperties} from '../../properties/apiProperties';
import {isAuth} from '../../auth/apiAuth';

const ManageProperties = ({op}) => {
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
    const [images, setImages] = useState([]);
    const [newProperty, setNewProperty] = useState({
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
        long: '',
        formData: new FormData()
    });
    const {_id, address, city, state, zip, rent, size, beds, baths, info, available, createdAt, updatedAt, long, lat, formData} = newProperty;
    const {token} = isAuth();

    const getAllProperties = useCallback(() => {
        readAllProperties().then(data => {
            setProperties(data);
        });
    }, []);

    useEffect(() => {
        getAllProperties();
    }, [getAllProperties]);

    const selectProperty = event => {
        let selectedId = event.target.value;
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
                    available: property.info,
                    createdAt: property.createdAt,
                    updatedAt: property.updatedAt,
                    lat: property.lat,
                    long: property.long
                });
                return;
            }
        });
    };

    const showAllPropertiesDropdown = () => op !== 'Add' && (
        <form className='mt-2'>
            <select value={selectedProperty._id} onChange={selectProperty} className="form-control text-primary" id="selectProperty">
                <option value='-1'>Select Property</option>
                {properties.map((property, i) => (
                    <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                ))}
            </select>
        </form>
    );

    const changePropertyInfo = selected => event => {
        let value = selected.includes('photos') ? event.target.files[0] : event.target.value;
        if(selected.includes('photos')) {
            let target = selected.split(' ')[1];
            let prop = selected.split(' ')[0];
            if(value === undefined || value.length < 1) {
                images.splice(target, 1, null);
                setImages([...images]);
                let photos = formData.getAll('photos');
                photos.splice(target, 1, null);
                photos.map((photo, i) => {
                    if(i === 0) {
                        formData.set('photos', photo);
                    } else {
                        formData.append('photos', photo);
                    }
                });
            } else if(target < images.length) {
                images.splice(target, 1, value);
                setImages([...images]);
                let photos = formData.getAll('photos');
                photos.splice(target, 1, value);
                photos.map((photo, i) => {
                    if(i === 0) {
                        formData.set('photos', photo);
                    } else {
                        formData.append('photos', photo);
                    }
                });
            } else {
                setImages([...images, value]);
                formData.append(prop, value);
            }
        } else {
            if(selected === 'available') {
                if(value === 'true') {
                    value = true;
                } else {
                    value = false;
                }
            }
            setNewProperty({...newProperty, [selected]: value});
            formData.set(selected, value);
        }
    };

    const addProperty = event => {
        event.preventDefault();
        createProperty(token, formData).then(returnData => {
            [...document.getElementsByClassName("input-photos")].forEach(
                (element) => {
                    element.value = null;
                }
            );
            setImages([]);
            setNewProperty({
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
                long: '',
                formData: new FormData()
            });
            getAllProperties();
        });
    };

    const deletePropertyClick = event => {
        event.preventDefault();
        deleteProperty(token, selectedProperty).then((data) => {
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
        });
    }

    const isFileSelected = i => {
        if(document.getElementsByClassName('input-photos')[i]) {
            let inputIndex = document.getElementsByClassName('input-photos')[i].value;
            return inputIndex.length > 0 ? true : false;
        }
    }

    const showSelectedPropertyInfo = () => (
        <form encType="multipart/form-data">
            <div className='row'>
                {op !== 'Add' && (
                    <div className="form-group col-12 row">
                        <label htmlFor="id" className="col-sm-3 col-lg-2 col-form-label"><strong>ID</strong></label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control text-primary" id="id" value={op === 'Add' ? `${_id}` : `${selectedProperty._id}`} />
                        </div>
                    </div>
                )}
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="address" className="col-sm-3 col-form-label"><strong>Address</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('address')} type="text" className="form-control text-primary" id="first_name" value={op === 'Add' ? `${address}` : `${selectedProperty.address}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="city" className="col-sm-3 col-form-label"><strong>City</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('city')} type="text" className="form-control text-primary" id="city" value={op === 'Add' ? `${city}` : `${selectedProperty.city}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="state" className="col-sm-3 col-form-label"><strong>State</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('state')} type="text" className="form-control text-primary" id="state" value={op === 'Add' ? `${state}` : `${selectedProperty.state}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="zip" className="col-sm-3 col-form-label"><strong>Zip</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('zip')} type="text" className="form-control text-primary" id="zip" value={op === 'Add' ? `${zip}` : `${selectedProperty.zip}`} />
                    </div>
                </div>
                {op !== 'Add' && (
                    <>
                        <div className="form-group col-12 col-lg-6 row">
                            <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Latitude</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control text-primary" id="id" value={op === 'Add' ? `${lat}` : `${selectedProperty.lat}`} />
                            </div>
                        </div>
                        <div className="form-group col-12 col-lg-6 row">
                            <label htmlFor="id" className="col-sm-3 col-form-label"><strong>Longitude</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control text-primary" id="id" value={op === 'Add' ? `${long}` : `${selectedProperty.long}`} />
                            </div>
                        </div>
                    </>
                )}
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="rent" className="col-sm-3 col-form-label"><strong>Rent</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('rent')} type="number" className="form-control text-primary" id="rent" value={op === 'Add' ? `${rent}` : `${selectedProperty.rent}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="size" className="col-sm-3 col-form-label"><strong>Size (Sq Ft)</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('size')} type="number" className="form-control text-primary" id="size" value={op === 'Add' ? `${size}` : `${selectedProperty.size}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="beds" className="col-sm-3 col-form-label"><strong>Beds</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('beds')} type="number" className="form-control text-primary" id="beds" value={op === 'Add' ? `${beds}` : `${selectedProperty.beds}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="baths" className="col-sm-3 col-form-label"><strong>Baths</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('baths')} type="number" className="form-control text-primary" id="baths" value={op === 'Add' ? `${baths}` : `${selectedProperty.baths}`} />
                    </div>
                </div>
                <div className="form-group col-12 row">
                    <label htmlFor="info" className="col-sm-3 col-lg-2 col-form-label"><strong>Additional Info</strong></label>
                    <div className="col-sm-9">
                        <textarea onChange={changePropertyInfo('info')} className="form-control text-primary" id="info" rows='4' value={op === 'Add' ? `${info}` : `${selectedProperty.info}`}></textarea>
                    </div>
                </div>
                <label htmlFor='photos' className="col-12 col-form-label"><strong>Upload Images (Up To 10)</strong></label>
                {op === 'Add' && (
                    <div className='col-auto'>
                        {isFileSelected(0) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 0')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 0 && (
                    <div className='col-auto'>
                        {isFileSelected(1) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 1')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 1 && (
                    <div className='col-auto'>
                        {isFileSelected(2) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 2')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 2 && (
                    <div className='col-auto'>
                        {isFileSelected(3) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 3')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 3 && (
                    <div className='col-auto'>
                        {isFileSelected(4) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 4')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 4 && (
                    <div className='col-auto'>
                        {isFileSelected(5) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 5')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 5 && (
                    <div className='col-auto'>
                        {isFileSelected(6) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 6')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 6 && (
                    <div className='col-auto'>
                        {isFileSelected(7) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 7')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 7 && (
                    <div className='col-auto'>
                        {isFileSelected(8) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 8')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                {op === 'Add' && images.length > 8 && (
                    <div className='col-auto'>
                        {isFileSelected(9) ? <i className="fas fa-check mr-2"></i> : <i class="fas fa-times mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 9')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                )}
                <div className="form-group col-12 row mt-3">
                    <label htmlFor="available" className="col-sm-auto col-form-label"><strong>Is this property currently available?</strong></label>
                    <div className="col-sm-auto mt-1">
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} checked={available === true} className="form-check-input" type="radio" name="available" id="availableyes" value="true" />
                            <label className="form-check-label text-primary" htmlFor="availableyes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} checked={available === false} className="form-check-input" type="radio" name="available" id="availableno" value="false" />
                            <label className="form-check-label text-primary" htmlFor="availableno">No</label>
                        </div>
                    </div>
                </div>
                {op !== 'Add' && (
                    <>
                        <div className="form-group col-12 col-lg-6 row">
                            <label htmlFor="id" className="col-sm-4 col-form-label"><strong>Added</strong></label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control text-primary" id="id" value={op === 'Add' ? `${createdAt}` : `${moment(selectedProperty.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                            </div>
                        </div>
                        <div className="form-group col-12 col-lg-6 row">
                            <label htmlFor="id" className="col-sm-4 col-form-label"><strong>Last Updated</strong></label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control text-primary" id="id" value={op === 'Add' ? `${updatedAt}` : `${moment(selectedProperty.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='text-center'>
                {op === 'Add' && <button onClick={addProperty} type='submit' className='btn btn-primary'>Create Property</button>}
                {op === 'Update' && <button type='submit' className='btn btn-primary'>Update Property</button>}
                {op === 'Remove' && <button onClick={deletePropertyClick} className='btn btn-danger'>Remove Property</button>}
            </div>
        </form>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>{op} Property</h1>
                </div>
                <div className='col-auto'>
                    {showAllPropertiesDropdown()}
                </div>
            </div>
            <hr />
            {showSelectedPropertyInfo()}
        </div>
    );
};

export default ManageProperties;