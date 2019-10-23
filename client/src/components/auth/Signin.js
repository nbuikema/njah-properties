import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate} from './apiAuth';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false
    });
    const {email, password, error, success} = values;

    const onChange = valueProp => event => {
        setValues({...values, [valueProp]: event.target.value, error: ''});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: ''});
        signin({email, password}).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false});
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
                <input onChange={onChange('email')} value={email} type='email' className='form-control' id='email' aria-describedby='email' />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input onChange={onChange('password')} value={password} type='password' className='form-control' id='password' />
            </div>
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary-inverse'>Sign In</button>
            </div>
        </form>
    );

    const successRedirect = () => success ? (
        <Redirect to='/' />
    ) : null;
    
    return (
        <div className='container'>
            <h1>Sign In</h1>
            {signinForm()}
            {successRedirect()}
        </div>
    );
};

export default Signin;