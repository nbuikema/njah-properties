import React, {useState, useEffect, useCallback} from 'react';
import {createProperty} from '../apiUsers';
import {isAuth} from '../../auth/apiAuth';

const AddProperties = () => {
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {address, city, state, zip, rent, size, beds, baths, info, available, formData} = newProperty;
    const {token} = isAuth();

    const setInitialAvailability = useCallback(() => {
        formData.set('available', false);
    }, [formData]);

    useEffect(() => {
        setInitialAvailability();
    }, [setInitialAvailability]);

    const changePropertyInfo = selected => event => {
        setError('');
        setSuccess(false);
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
                        return formData.set('photos', photo);
                    } else {
                        return formData.append('photos', photo);
                    }
                });
            } else if(target < images.length) {
                images.splice(target, 1, value);
                setImages([...images]);
                let photos = formData.getAll('photos');
                photos.splice(target, 1, value);
                photos.map((photo, i) => {
                    if(i === 0) {
                        return formData.set('photos', photo);
                    } else {
                        return formData.append('photos', photo);
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
        setError('');
        createProperty(token, formData).then((returnData, err) => {
            if(!returnData || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(returnData.err) {
                    setError(returnData.err);
                } else {
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
                    setSuccess(true);
                }
            }
        });
    };

    const isFileSelected = i => {
        if(document.getElementsByClassName('input-photos')[i]) {
            let inputIndex = document.getElementsByClassName('input-photos')[i].value;
            return inputIndex.length > 0 ? true : false;
        }
    }

    const showSelectedPropertyInfo = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
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
                <div className="form-group col-12 row form-row">
                    <label htmlFor='photos' className="col-12 col-form-label"><strong>Upload Images (Up To 10) - <small>The first image will be the property preview, so we recommend using the front of the property.</small></strong></label>
                    <div className='col-auto'>
                        {isFileSelected(0) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                        <input onChange={changePropertyInfo('photos 0')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                    </div>
                    {images.length > 0 && (
                        <div className='col-auto'>
                            {isFileSelected(1) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 1')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 1 && (
                        <div className='col-auto'>
                            {isFileSelected(2) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 2')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 2 && (
                        <div className='col-auto'>
                            {isFileSelected(3) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 3')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 3 && (
                        <div className='col-auto'>
                            {isFileSelected(4) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 4')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 4 && (
                        <div className='col-auto'>
                            {isFileSelected(5) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 5')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 5 && (
                        <div className='col-auto'>
                            {isFileSelected(6) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 6')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 6 && (
                        <div className='col-auto'>
                            {isFileSelected(7) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 7')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 7 && (
                        <div className='col-auto'>
                            {isFileSelected(8) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 8')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 8 && (
                        <div className='col-auto'>
                            {isFileSelected(9) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 9')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 9 && (
                        <div className='col-auto'>
                            {isFileSelected(10) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 10')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 10 && (
                        <div className='col-auto'>
                            {isFileSelected(11) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 11')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 11 && (
                        <div className='col-auto'>
                            {isFileSelected(12) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 12')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 12 && (
                        <div className='col-auto'>
                            {isFileSelected(13) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 13')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 13 && (
                        <div className='col-auto'>
                            {isFileSelected(14) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 14')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 14 && (
                        <div className='col-auto'>
                            {isFileSelected(15) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 15')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 15 && (
                        <div className='col-auto'>
                            {isFileSelected(16) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 16')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 16 && (
                        <div className='col-auto'>
                            {isFileSelected(17) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 17')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 17 && (
                        <div className='col-auto'>
                            {isFileSelected(18) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 18')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                    {images.length > 18 && (
                        <div className='col-auto'>
                            {isFileSelected(19) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                            <input onChange={changePropertyInfo('photos 19')} type='file' accept='image/*' className='input-photos mt-1 text-primary' />
                        </div>
                    )}
                </div>
                <div className='col-12 text-center'>
                    <button onClick={addProperty} type='submit' className='btn btn-primary'>Create Property</button>
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
            Property was successfully added.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Add Property</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {showSelectedPropertyInfo()}
        </div>
    );
};

export default AddProperties;