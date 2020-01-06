import React, {useState, useEffect, useCallback} from 'react';
import {sendContact} from '../../core/apiContact';

const Maintenance = ({user}) => {
    const [contact, setContact] = useState({
        user: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        property: '',
        reason: '',
        message: '',
        formData: new FormData()
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {message, reason, formData, property} = contact;

    const setUserFormInfo = useCallback(() => {
        if(user.property._id && user.property._id.length > 0) {
            setError('');
            setContact({
                ...contact,
                user: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                property: user.property._id
            });
            formData.set('user', user._id);
            formData.set('first_name', user.first_name);
            formData.set('last_name', user.last_name);
            formData.set('email', user.email);
            formData.set('phone', user.phone);
            formData.set('property', user.property._id);
        } else {
            setError('You are not currently assigned to a property.');
        }
    }, [formData, user]);

    useEffect(() => {
        setUserFormInfo();
    }, [setUserFormInfo]);

    const onChange = selected => event => {
        setError('');
        setSuccess(false);
        let value = event.target.value;
        setContact({...contact, [selected]: value});
        formData.set(selected, value);
    };

    const onSubmit = event => {
        event.preventDefault();
        formData.set('type', 'Resident');
        setError('');
        setSuccess(false);
        sendContact(formData).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    setContact({
                        ...contact,
                        reason: '',
                        message: '',
                        formData: new FormData()
                    });
                    setError('');
                    setSuccess(true);
                }
            }
        });
    };

    const contactForm = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor='reason'>What Can We Help With?</label>
                    <select value={reason} onChange={onChange('reason')} className="form-control text-primary" id="reason" name="reason">
                        <option value=''>Select One</option>
                        <option value='Complaint'>Complaint</option>
                        <option value='Financial'>Financial</option>
                        <option value='Lease Renewal'>Lease Renewal</option>
                        <option value='General'>General</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='form-group col-12 row form-row'>
                    <label htmlFor='message'>What Should We Know?</label>
                    <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
                </div>
                <div className='col-12 text-center'>
                    <button onClick={onSubmit} type='submit' className='btn btn-primary'>Submit</button>
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
            Thank you for contacting us! We will be in touch with you as soon as possible.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Contact Property</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {contactForm()}
        </div>
    );
};

export default Maintenance;