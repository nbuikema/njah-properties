import React, {useState, useEffect, useCallback} from 'react';
import {sendContact} from '../../core/apiContact';

const Maintenance = ({user}) => {
    const [contact, setContact] = useState({
        user: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        property: user.property._id,
        reason: '',
        severity: '',
        message: '',
        formData: new FormData()
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {message, reason, severity, formData, property} = contact;

    const setUserFormInfo = useCallback(() => {
        setError('');
        formData.set('user', user._id);
        formData.set('first_name', user.first_name);
        formData.set('last_name', user.last_name);
        formData.set('email', user.email);
        formData.set('phone', user.phone);
        formData.set('property', user.property._id);
    }, [formData, user]);

    useEffect(() => {
        setUserFormInfo();
    }, [setUserFormInfo]);

    const onChange = selected => event => {
        setError('');
        setSuccess(false);
        let value = event.target.value;
        if(selected === 'severity' && value === 'Emergency') {
            window.confirm('If this issue is a true emergency (fire, flood, life-threatening), please call 911 immediately.');
        }
        setContact({...contact, [selected]: value});
        formData.set(selected, value);
    };

    const onSubmit = event => {
        event.preventDefault();
        formData.set('type', 'Maintenance');
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
                        severity: '',
                        message: '',
                        formData: new FormData()
                    });
                    setError('');
                    setSuccess(true);
                }
            }
        });
    };

    const contactForm = () => {
        property && property.length > 0 ? (
            <form encType="multipart/form-data">
                <div className='row mr-1'>
                    <div className="form-group col-12 row form-row">
                        <label htmlFor='reason'>Where Is The Issue?</label>
                        <select value={reason} onChange={onChange('reason')} className="form-control text-primary" id="reason" name="reason">
                            <option value=''>Select One</option>
                            <option value='Bedroom'>Bedroom</option>
                            <option value='Bathroom'>Bathroom</option>
                            <option value='Kitchen'>Kitchen</option>
                            <option value='Living Room'>Living Room</option>
                            <option value='Laundry Room'>Laundry Room</option>
                            <option value='Hallway'>Hallway</option>
                            <option value='Outside'>Outside</option>
                            <option value='Garage'>Garage</option>
                            <option value='Roof'>Roof</option>
                            <option value='Property Wide'>Property Wide</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <div className="form-group col-12 row form-row">
                        <label htmlFor='severity'>How Severe Is The Issue?</label>
                        <select value={severity} onChange={onChange('severity')} className="form-control text-primary" id="severity" name="severity">
                            <option value=''>Select One</option>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                            <option value='Emergency'>Emergency</option>
                        </select>
                    </div>
                    <div className='form-group col-12 row form-row'>
                        <label htmlFor='message'>Please Provide a Detailed Description of the Issue</label>
                        <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
                    </div>
                    <div className='col-12 text-center'>
                        <button onClick={onSubmit} type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </form>
        ) : setError('You are not currently assigned to a property.');
    };

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
                    <h1>Maintenance Request</h1>
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