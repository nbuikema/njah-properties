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
    const {message, formData} = contact;

    const setUserFormInfo = useCallback(() => {
        formData.set('user', user._id);
        formData.set('first_name', user.first_name);
        formData.set('last_name', user.last_name);
        formData.set('email', user.email);
        formData.set('phone', user.phone);
        formData.set('property', user.property._id);
    }, [formData, user._id, user.first_name, user.last_name, user.email, user.phone, user.property._id]);

    useEffect(() => {
        setUserFormInfo();
    }, [setUserFormInfo]);

    const onChange = selected => event => {
        let value = event.target.value;
        if(selected === 'reason') {
            formData.set(selected, value);
            setContact({
                ...contact,
                message: '',
                severity: '',
                reason: value
            });
        } else {
            setContact({...contact, [selected]: value});
            formData.set(selected, value);
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        formData.set('type', 'Resident');
        sendContact(formData).then(data => {
            setContact({
                ...contact,
                reason: '',
                severity: '',
                message: '',
                formData: new FormData()
            });
        });
    };

    const contactForm = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor='reason'>What Can We Help With?</label>
                    <select onChange={onChange('reason')} className="form-control text-primary" id="reason" name="reason">
                        <option value=''>Select One</option>
                        <option value='General Question'>General Question</option>
                        <option value='Payment'>Payment</option>
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

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Contact Property</h1>
                </div>
            </div>
            <hr />
            {contactForm()}
        </div>
    );
};

export default Maintenance;