import React, {useState, useEffect, useCallback} from 'react';
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
        <form>
            <div className="form-group">
                <label htmlFor="selectProperty">Select Property</label>
                <select value={selectedProperty._id} onChange={selectProperty} className="form-control" id="selectProperty">
                    <option value='-1'>Select Property</option>
                    {properties.map((property, i) => (
                        <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                    ))}
                </select>
            </div>
        </form>
    );

    const changePropertyInfo = selected => event => {
        let value = selected === 'photos' ? event.target.files[0] : event.target.value;
        if(selected === 'photos') {
            setImages([...images, value]);
            formData.append(selected, value);
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

    const showImageField = () => (
        <div className='form-group col-6 row'>
            <label htmlFor='photos' className="col col-form-label">Upload Image</label>
            <div className='col'>
                <input onChange={changePropertyInfo('photos')} type='file' accept='image/*' className='input-photos' />
            </div>
        </div>
    );

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

    const showSelectedPropertyInfo = () => (
        <form encType="multipart/form-data">
            <div className='row'>
                <div className="form-group col-12 row">
                    <label htmlFor="id" className="col-sm-3 col-lg-2 col-form-label">ID</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${_id}` : `${selectedProperty._id}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="address" className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('address')} type="text" className="form-control" id="first_name" value={op === 'Add' ? `${address}` : `${selectedProperty.address}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="city" className="col-sm-3 col-form-label">City</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('city')} type="text" className="form-control" id="city" value={op === 'Add' ? `${city}` : `${selectedProperty.city}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="state" className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('state')} type="text" className="form-control" id="state" value={op === 'Add' ? `${state}` : `${selectedProperty.state}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="zip" className="col-sm-3 col-form-label">Zip</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('zip')} type="text" className="form-control" id="zip" value={op === 'Add' ? `${zip}` : `${selectedProperty.zip}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="id" className="col-sm-3 col-form-label">Latitude</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${lat}` : `${selectedProperty.lat}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="id" className="col-sm-3 col-form-label">Longitude</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${long}` : `${selectedProperty.long}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="rent" className="col-sm-3 col-form-label">Rent</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('rent')} type="number" className="form-control" id="rent" value={op === 'Add' ? `${rent}` : `${selectedProperty.rent}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="size" className="col-sm-3 col-form-label">Size (Sq Ft)</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('size')} type="number" className="form-control" id="size" value={op === 'Add' ? `${size}` : `${selectedProperty.size}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="beds" className="col-sm-3 col-form-label">Beds</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('beds')} type="number" className="form-control" id="beds" value={op === 'Add' ? `${beds}` : `${selectedProperty.beds}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="baths" className="col-sm-3 col-form-label">Baths</label>
                    <div className="col-sm-9">
                        <input onChange={changePropertyInfo('baths')} type="number" className="form-control" id="baths" value={op === 'Add' ? `${baths}` : `${selectedProperty.baths}`} />
                    </div>
                </div>
                <div className="form-group col-12 row">
                    <label htmlFor="info" className="col-sm-3 col-lg-2 col-form-label">Additional Info</label>
                    <div className="col-sm-9">
                        <textarea onChange={changePropertyInfo('info')} className="form-control" id="info" rows='4' value={op === 'Add' ? `${info}` : `${selectedProperty.info}`}></textarea>
                    </div>
                </div>
                {showImageField()}
                {images.length > 0 && showImageField()}
                {images.length > 1 && showImageField()}
                {images.length > 2 && showImageField()}
                {images.length > 3 && showImageField()}
                {images.length > 4 && showImageField()}
                {images.length > 5 && showImageField()}
                {images.length > 6 && showImageField()}
                {images.length > 7 && showImageField()}
                {images.length > 8 && showImageField()}
                <div className="form-group col-12 row">
                    <label htmlFor="available" className="col-sm-auto col-form-label">Is this property currently available?</label>
                    <div className="col-sm-auto">
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} className="form-check-input" type="radio" name="available" id="availableyes" value="true" />
                            <label className="form-check-label" htmlFor="availableyes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={changePropertyInfo('available')} className="form-check-input" type="radio" name="available" id="availableno" value="false" checked />
                            <label className="form-check-label" htmlFor="availableno">No</label>
                        </div>
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="id" className="col-sm-4 col-form-label">Added</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${createdAt}` : `${selectedProperty.createdAt}`} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row">
                    <label htmlFor="id" className="col-sm-4 col-form-label">Last Updated</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${updatedAt}` : `${selectedProperty.updatedAt}`} />
                    </div>
                </div>
            </div>
            <div className='text-center'>
                {op === 'Add' && <button onClick={addProperty} type='submit' className='btn btn-primary'>Create Property</button>}
                {op === 'Update' && <button type='submit' className='btn btn-primary'>Update Property</button>}
                {op === 'Remove' && <button onClick={deletePropertyClick} className='btn btn-danger'>Remove Property</button>}
            </div>
        </form>
    );

    return (
        <div>
            <h1 className='my-4'>{op} Property</h1>
            <hr />
            {showAllPropertiesDropdown()}
            {showSelectedPropertyInfo()}
        </div>
    );
};

export default ManageProperties;