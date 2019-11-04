import React, {useState} from 'react';
import {createProperty} from '../apiUsers';
import {isAuth} from '../../auth/apiAuth';

const ManageProperties = ({op}) => {
    const [images, setImages] = useState([]);
    const [newProperty, setNewProperty] = useState({
        address: '',
        city: '',
        state: '',
        zip: '',
        rent: 0,
        size: 0,
        beds: 0,
        baths: 0,
        info: '',
        available: false,
        formData: new FormData()
    });
    const {address, city, state, zip, rent, size, beds, baths, info, available, formData} = newProperty;
    const {token} = isAuth();

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
        createProperty(token, formData).then(data => {
            setNewProperty({
                address: '',
                city: '',
                state: '',
                zip: '',
                rent: 0,
                size: 0,
                beds: 0,
                baths: 0,
                info: '',
                available: false,
                formData: new FormData()
            });
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
                    <input onChange={changePropertyInfo('address')} type="text" className="form-control" id="first_name" value={address} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="city" className="col-sm-4 col-form-label">City</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('city')} type="text" className="form-control" id="city" value={city} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="state" className="col-sm-4 col-form-label">State</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('state')} type="text" className="form-control" id="state" value={state} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="zip" className="col-sm-4 col-form-label">Zip</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('zip')} type="text" className="form-control" id="zip" value={zip} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="rent" className="col-sm-4 col-form-label">Rent</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('rent')} type="number" className="form-control" id="rent" value={rent} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="size" className="col-sm-4 col-form-label">Size (Sq Ft)</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('size')} type="number" className="form-control" id="size" value={size} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="beds" className="col-sm-4 col-form-label">Beds</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('beds')} type="number" className="form-control" id="beds" value={beds} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="baths" className="col-sm-4 col-form-label">Baths</label>
                <div className="col-sm-8">
                    <input onChange={changePropertyInfo('baths')} type="number" className="form-control" id="baths" value={baths} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="info" className="col-sm-4 col-form-label">Additional Info</label>
                <div className="col-sm-8">
                    <textarea onChange={changePropertyInfo('info')} className="form-control" id="info" rows='4' value={info}></textarea>
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
            <div className="form-group row">
                <label htmlFor="available" className="col-sm-4 col-form-label">Is this property currently available?</label>
                <div className="col-sm-8">
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
            <div className='text-center'>
                <button onClick={addProperty} type='submit' className='btn btn-primary'>Create Property</button>
            </div>
        </form>
    );

    return (
        <div>
            <h1>{op} Properties</h1>
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageProperties;