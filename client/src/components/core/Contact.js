import React, {useState, useEffect} from 'react';
import {readAllProperties} from '../properties/apiProperties';
import {sendContact} from './apiContact';

const Contact = () => {
    const [properties, setProperties] = useState([]);
    const [contact, setContact] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        reason: '',
        property: '',
        application: '',
        message: '',
        formData: new FormData()
    });
    const {first_name, last_name, email, phone, reason, property, application, message, formData} = contact;

    const getAllProperties = () => {
        readAllProperties().then(data => {
            setProperties(data);
        });
    };

    useEffect(() => {
        getAllProperties();
    }, []);

    const onChange = selected => event => {
        let value = selected === 'application' ? event.target.files[0] : event.target.value;
        if(selected === 'reason') {
            formData.set(selected, value);
            formData.delete('application');
            setContact({
                ...contact,
                property: '',
                message: '',
                application: '',
                reason: value
            });
        } else {
            setContact({...contact, [selected]: value});
            formData.set(selected, value);
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        formData.set('type', 'General');
        sendContact(formData).then(data => {
            setContact({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                reason: '',
                property: '',
                application: '',
                message: '',
                formData: new FormData()
            });
        });
    };

    const conditionalInput = () => {
        switch(reason) {
            case 'Property Inquiry':
                return (
                    <div>
                        <div className="form-group">
                            <label htmlFor='property'>Which Property Are You Interested In?</label>
                            <select value={property} onChange={onChange('property')} className="form-control" id="property" name="property">
                                <option value=''>Select One</option>
                                {properties.map((property, i) => (
                                    <option key={i} value={property._id}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Anything Else We Should Know?</label>
                            <textarea onChange={onChange('message')} value={message} rows='4' className='form-control' id='message' aria-describedby='message'></textarea>
                        </div>
                    </div>
                );
                case 'Property Application':
                    return (
                        <div>
                            <div className="form-group">
                                <label htmlFor='property'>Which Property Are You Interested In?</label>
                                <select value={property} onChange={onChange('property')} className="form-control" id="property" name="property">
                                    <option value=''>Select One</option>
                                    {properties.map((property, i) => (
                                        <option key={i} value={property._id}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='application'>Upload Application&nbsp;</label>
                                <input onChange={onChange('application')} type='file' accept='*' id='application' name='application' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Anything Else We Should Know?</label>
                                <textarea onChange={onChange('message')} value={message} rows='4' className='form-control' id='message' aria-describedby='message'></textarea>
                            </div>
                        </div>
                    );
            case 'Other':
                return (
                    <div className='form-group'>
                        <label htmlFor='message'>How Can We Help?</label>
                        <textarea onChange={onChange('message')} value={message} rows='4' className='form-control' id='message' aria-describedby='message'></textarea>
                    </div>
                );
            default:
                return null;
        }
    }

    const contactForm = () => (
        <form encType="multipart/form-data">
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <div className='form-group'>
                        <label htmlFor='first_name'>First Name</label>
                        <input onChange={onChange('first_name')} value={first_name} type='text' className='form-control' id='first_name' aria-describedby='firstName' />
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <div className='form-group'>
                        <label htmlFor='last_name'>Last Name</label>
                        <input onChange={onChange('last_name')} value={last_name} type='text' className='form-control' id='last_name' aria-describedby='lastName' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input onChange={onChange('email')} value={email} type='email' className='form-control' id='email' aria-describedby='email' />
                    </div>
                </div>
                <div className='col-md-12 col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input onChange={onChange('phone')} value={phone} type='tel' className='form-control' id='phone' aria-describedby='phone' />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor='reason'>Reason for Contact</label>
                <select onChange={onChange('reason')} className="form-control" id="reason" name="reason">
                    <option value=''>Select One</option>
                    <option value='Property Inquiry'>Property Inquiry</option>
                    <option value='Property Application'>Apply for Property</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            {conditionalInput()}
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Get In Touch</button>
            </div>
        </form>
    );

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-8'>
                    <h2>Send Us A Message</h2>
                    <br />
                    {contactForm()}
                </div>
                <div className='col-4'>
                    <div>
                        <h2>Forms</h2>
                        <br />
                        <a href=''>Application</a>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div>
                        <h2>Contact Info</h2>
                        <br />
                        <h6>Telephone</h6>
                        <a href="tel:1234567890">123-456-7890</a>
                        <hr />
                        <h6>Fax</h6>
                        <a href="tel:1234567890">123-456-7890</a>
                        <hr />
                        <h6>Email</h6>
                        <a href="mailto:sample@email.com">sample@email.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;