import React, {useState, useEffect, useCallback} from 'react';
import DropIn from 'braintree-web-drop-in-react';
import {isAuth} from '../../auth/apiAuth';
import {getClientToken, processPayment} from '../apiUsers';

const PayRent = ({user}) => {
    const {property} = user;
    const [payment, setPayment] = useState({
        clientToken: null,
        instance: {}
    });
    const {clientToken} = payment;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {token} = isAuth();

    const getToken = useCallback(() => {
        getClientToken(token).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setPayment({...payment, clientToken: data.clientToken});
            }
        });
    }, [payment, token]);

    useEffect(() => {
        getToken();
    }, [getToken]);

    const onClick = () => {
        let nonce;
        payment.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: (property.rent * 1.03)
            };
            processPayment(token, paymentData).then(response => {
                setSuccess(true);
            }).catch(error => {
                setError(error.message);
            });
        }).catch(error => {
            setError(error.message);
        });
    };

    const showDropIn = () => (
        <div>
            {clientToken !== null ? (
                <div className='mr-3'>
                    <DropIn className='mt-0' options={{authorization: clientToken}} onInstance={instance => (payment.instance = instance)} />
                    <button onClick={onClick} className='btn btn-success btn-block mb-3'>Confirm Payment</button>
                </div>
            ) : ''}
        </div>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            Your payment was successful. You will receive a receipt to your email shortly.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Pay Rent</h1>
                </div>
            </div>
            <hr />
            <h6><strong>My Rent:</strong> ${property.rent}</h6>
            <h6><strong>Total to be Charged:</strong> ${parseFloat(Math.round((property.rent * 1.03) * 100) / 100).toFixed(2)} <small>* There is a 3% convenience fee charged for online rental payments.</small></h6>
            {showError()}
            {showSuccess()}
            {showDropIn()}
        </div>
    );
};

export default PayRent;