import React, {useState, useEffect} from 'react';
import {updateSelf} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

const UpdateSelf = ({user}) => {
    const [updatedUser, setUpdatedUser] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {first_name, last_name, email, phone, password, confirm_password} = updatedUser;
    const {token} = isAuth();

    useEffect(() => {
        setUpdatedUser({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            password: '',
            confirm_password: ''
        });
    }, [user]);

    const onChange = selected => event => {
        setError('');
        setSuccess(false);
        setUpdatedUser({...updatedUser, [selected]: event.target.value});
    };

    const submitUpdate = event => {
        event.preventDefault();
        setError('');
        if(password !== confirm_password) {
            setError('Passwords must match.');
        } else {
            updateSelf(token, updatedUser).then((data, err) => {
                if(err || !data) {
                    setError('Oops! Something went wrong.');
                } else {
                    if(data.err) {
                        setError(data.err);
                    } else {
                        setUpdatedUser({...updatedUser, password: '', confirm_password: ''});
                        setSuccess(true);
                    }
                }
            });
        }
    };

    const showUserInfo = () => (
        <form className='mt-3'>
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="first_name" className="col-sm-3 col-form-label"><strong>First Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('first_name')} type="text" className="form-control text-primary" id="first_name" value={first_name} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="last_name" className="col-sm-3 col-form-label"><strong>Last Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('last_name')} type="text" className="form-control text-primary" id="last_name" value={last_name} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="email" className="col-sm-3 col-form-label"><strong>Email</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('email')} type="email" className="form-control text-primary" id="email" value={email} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label"><strong>Phone</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('phone')} type="text" className="form-control text-primary" id="phone" value={phone} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="password" className="col-sm-3 col-form-label"><strong>New Password</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('password')} autoComplete="new-password" type="password" className="form-control text-primary" id="password" value={password} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="confirm_password" className="col-sm-3 col-form-label"><strong>Confirm New Password</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('confirm_password')} type="password" className="form-control text-primary" id="confirm_password" value={confirm_password} />
                    </div>
                </div>
                <div className='col-12 text-center'>
                    <button onClick={submitUpdate} type='submit' className='btn btn-primary'>Update My Info</button>
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
            Your info was successfully updated.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Update My Info</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {showUserInfo()}
        </div>
    );
};

export default UpdateSelf;