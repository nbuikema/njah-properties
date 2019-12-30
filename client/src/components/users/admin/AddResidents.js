import React, {useState} from 'react';
import {signup, isAuth} from '../../auth/apiAuth';

const Signup = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {first_name, last_name, email, phone} = user;
    const {token} = isAuth();

    const onChange = selected => event => {
        setUser({...user, [selected]: event.target.value});
        setError('');
        setSuccess(false);
    };

    const onSubmit = event => {
        event.preventDefault();
        setError('');
        signup(token, {first_name, last_name, email, phone}).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    setUser({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: ''
                    });
                    setSuccess(true);
                }
            }
        });
    };

    const signupForm = () => (
        <form className='mt-3'>
            <div className='row mr-1'>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="first_name" className="col-sm-3 col-form-label"><strong>First Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('first_name')} type="text" className="form-control text-primary" id="first_name" value={first_name} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="last_name" className="col-sm-3 col-form-label"><strong>Last Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('last_name')} type="text" className="form-control text-primary" id="last_name" value={last_name} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="email" className="col-sm-3 col-form-label"><strong>Email</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('email')} type="email" className="form-control text-primary" id="email" value={email} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label"><strong>Phone</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('phone')} type="text" className="form-control text-primary" id="phone" value={phone} />
                    </div>
                </div>
                <div className='col-12 text-center'>
                    <button onClick={onSubmit} type='submit' className='btn btn-primary'>Add Resident</button>
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
            Resident was successfully added.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Add Resident</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {signupForm()}
        </div>
    );
};

export default Signup;