import React, {useState, useEffect} from 'react';
import moment from 'moment';
import DropIn from 'braintree-web-drop-in-react';
import {isAuth} from '../../auth/apiAuth';
import {getClientToken, processPayment} from '../apiUsers';

const PayRent = ({user}) => {
    const {_id, property, payments} = user;
    const [payment, setPayment] = useState({
        clientToken: null,
        instance: {}
    });
    const {clientToken} = payment;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {token} = isAuth();

    const getToken = () => {
        getClientToken(token).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.error) {
                    setError(data.error);
                } else {
                    setPayment({...payment, clientToken: data.clientToken});
                }
            }
        });
    };

    useEffect(() => {
        getToken();
    }, []);

    const onClick = () => {
        const confirmPayment = window.confirm(`Are you sure you want to make a payment in the amount of $${parseFloat(Math.round((property.rent * 1.03) * 100) / 100).toFixed(2)}? By selecting OK, you are agreeing to a convenience fee of 3%. This transaction is nonrefundable.`);
        if(confirmPayment) {
            let nonce;
            payment.instance.requestPaymentMethod().then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: (property.rent * 1.03)
                };
                processPayment(token, _id, paymentData).then(response => {
                    setSuccess(true);
                }).catch(error => {
                    setError(error.message);
                });
            }).catch(error => {
                setError(error.message);
            });
        }
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
            {showError()}
            {showSuccess()}
            <h5><strong>My Rent:</strong> ${property.rent}</h5>
            <h5><strong>Total to be Charged:</strong> ${parseFloat(Math.round((property.rent * 1.03) * 100) / 100).toFixed(2)}</h5>
            <h5><small>* There is a 3% convenience fee charged for online rental payments.</small></h5>
            {showDropIn()}
            <div className='row'>
                <div className='mt-4 col-auto'>
                    <h1>Payment History</h1>
                </div>
            </div>
            <hr />
            {payments.map((payment, i) => (
                <div key={i}>
                    <h6><strong>Amount:</strong> ${parseFloat(Math.round((payment.amount) * 100) / 100).toFixed(2)}</h6>
                    <h6><strong>Date:</strong> {moment(payment.date).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default PayRent;