import React, {useState, useEffect} from 'react';
import {sendContact} from '../../core/apiContact';

const Maintenance = ({user}) => {
    const [contact, setContact] = useState({
        user: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: '123',
        property: user.property._id,
        reason: '',
        severity: '',
        message: '',
        formData: new FormData()
    });
    const {first_name, last_name, email, phone, reason, property, severity, message, formData} = contact;

    const setUserFormInfo = () => {
        formData.set('user', user._id);
        formData.set('first_name', user.first_name);
        formData.set('last_name', user.last_name);
        formData.set('email', user.email);
        formData.set('phone', '123');
        formData.set('property', user.property._id);
    }

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
        formData.set('type', 'Maintenance');
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
            <div className='row'>
                <div className='col-md-12 col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input onChange={onChange('phone')} value={phone} type='tel' className='form-control text-primary' id='phone' aria-describedby='phone' />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor='reason'>Where Is The Issue?</label>
                <select onChange={onChange('reason')} className="form-control text-primary" id="reason" name="reason">
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
            <div className='form-group'>
                <label htmlFor='message'>Please Provide a Detailed Description of the Issue</label>
                <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
            </div>
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Get In Touch</button>
            </div>
        </form>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Maintenance Request</h1>
                </div>
            </div>
            <hr />
            {contactForm()}
        </div>
    );
};

export default Maintenance;