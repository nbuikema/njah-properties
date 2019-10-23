import React, {useState} from 'react';
import {isAdmin, isAuth} from './apiAuth';

const Secret = () => {
    const [secret, setSecret] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        if(isAuth()) {
            isAdmin(isAuth()).then((data) => {
                setSecret(data);
            });
        }
    };

    const showAdmin = () => (
        <form className='mt-3'>
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary-inverse'>Get Secret</button>
            </div>
        </form>
    );
    
    return (
        <div className='container'>
            <h1>Secret</h1>
            {showAdmin()}
            {JSON.stringify(secret)}
        </div>
    );
};

export default Secret;