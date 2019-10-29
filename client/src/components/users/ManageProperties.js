import React, {useState} from 'react';
import {createProperty} from './apiUsers';

const ManageProperties = () => {
    const [images, setImages] = useState([]);
    const [newProperty, setNewProperty] = useState({
        address: '',
        city: '',
        state: '',
        zip: '',
        formData: new FormData()
    });
    const {address, city, state, zip, formData} = newProperty;

    const changePropertyInfo = selected => event => {
        const value = selected === 'photos' ? event.target.files[0] : event.target.value;
        if(selected === 'photos') {
            setImages([...images, value]);
            formData.append(selected, value);
        } else {
            setNewProperty({...newProperty, [selected]: value});
            formData.set(selected, value);
        }
    };

    const addProperty = event => {
        event.preventDefault();
        createProperty(formData).then(data => {
            console.log(data);
        });
    };

    const showImageField = () => (
        <div className='form-group row'>
            <label htmlFor='photos' className="col-sm-4 col-form-label">Upload Image</label>
            <div className='col-sm-8'>
                <input onChange={changePropertyInfo('photos')} type='file' accept='image/*' id='photos' />
            </div>
        </div>
    );

    const showSelectedUserInfo = () => (
        <form encType="multipart/form-data">
            <div className="form-group row">
                <label htmlFor="address" className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('address')} type="text" className="form-control" id="first_name" value={`${address}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="city" className="col-sm-4 col-form-label">City</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('city')} type="text" className="form-control" id="city" value={`${city}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="state" className="col-sm-4 col-form-label">State</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('state')} type="text" className="form-control" id="state" value={`${state}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="zip" className="col-sm-4 col-form-label">Zip</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('zip')} type="text" className="form-control" id="zip" value={`${zip}`} />
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
            <div className='text-center'>
                <button onClick={addProperty} type='submit' className='btn btn-primary'>Create Property</button>
            </div>
        </form>
    );

    return (
        <div>
            <h1>Manage Properties</h1>
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageProperties;