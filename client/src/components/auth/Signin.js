import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {signin, authenticate} from './apiAuth';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        success: false
    });
    const {email, password, success} = values;

    const onChange = valueProp => event => {
        setValues({...values, [valueProp]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        signin({email, password}).then(data => {
            if(data.error) {
                setValues({...values, success: false});
            } else {
                authenticate(data, () => {
                    setValues({...values, success: true});
                });
            }
        });
    };

    const signinForm = () => (
        <form className='mt-3'>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input onChange={onChange('email')} value={email} type='email' className='form-control text-primary' id='email' aria-describedby='email' />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input onChange={onChange('password')} value={password} type='password' className='form-control text-primary' id='password' />
            </div>
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Sign In</button>
                <Link className='mt-4 d-block' to={`/password/reset`}>
                    Forgot Password?
                </Link>
            </div>
        </form>
    );

    const successRedirect = () => success ? (
        <Redirect to='/dashboard' />
    ) : null;
    
    return (
        <div className='text-primary my-5'>
            <div className='container'>
                <h1 className='text-center'>Sign In</h1>
                <hr />
                {signinForm()}
                {successRedirect()}
            </div>
        </div>
    );
};

export default Signin;