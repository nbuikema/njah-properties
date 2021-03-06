import React, {useState, useEffect} from 'react';
import {readAllProperties} from '../properties/apiProperties';
import {sendContact, readAllForms} from './apiContact';

const Contact = () => {
    const [forms, setForms] = useState([]);
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {first_name, last_name, email, phone, reason, property, message, formData} = contact;

    const getAllProperties = () => {
        readAllProperties().then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    setProperties(data);
                }
            }
        });
    };

    const getAllForms = () => {
        readAllForms().then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    setForms(data);
                }
            }
        });
    };

    useEffect(() => {
        getAllProperties();
        getAllForms();
    }, []);

    const onChange = selected => event => {
        setError('');
        setSuccess(false);
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
        if(reason === 'Property Application' && !isApplicationSelected(0)) {
            return setError('You must attach an application.');
        }
        sendContact(formData).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    if(reason === 'Property Application') {
                        document.getElementById("application").value = null;
                    }
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
                    setError('');
                    setSuccess(true);
                }
            }
        });
    };

    const isApplicationSelected = i => {
        if(document.getElementsByClassName('application')[i]) {
            let inputIndex = document.getElementsByClassName('application')[i].value;
            return inputIndex.length > 0 ? true : false;
        }
    };

    const conditionalInput = () => {
        switch(reason) {
            case 'Property Inquiry':
                return (
                    <div>
                        <div className="form-group">
                            <label htmlFor='property'>Which Property Are You Interested In?</label>
                            <select value={property} onChange={onChange('property')} className="form-control text-primary" id="property" name="property">
                                <option value=''>Select One</option>
                                {properties.length > 0 && properties.map((property, i) => property.available === true && (
                                    <option key={i} value={property._id} key={i}>{`${property.address}, ${property.address2 ? `${property.address2}, ` : ``} ${property.city}, ${property.state}, ${property.zip}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Anything Else We Should Know?</label>
                            <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
                        </div>
                    </div>
                );
                case 'Property Application':
                    return (
                        <div>
                            <div className="form-group">
                                <label htmlFor='property'>Which Property Are You Interested In?</label>
                                <select value={property} onChange={onChange('property')} className="form-control text-primary" id="property" name="property">
                                    <option value=''>Select One</option>
                                    {properties.length > 0 && properties.map((property, i) => property.available === true && (
                                        <option key={i} value={property._id} key={i}>{`${property.address}, ${property.address2 ? `${property.address2}, ` : ``} ${property.city}, ${property.state}, ${property.zip}`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='application'>Upload Application&nbsp;</label>
                                <input onChange={onChange('application')} type='file' accept='*' id='application' name='application' className='text-primary application' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Anything Else We Should Know?</label>
                                <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
                            </div>
                        </div>
                    );
            case 'Other':
                return (
                    <div className='form-group'>
                        <label htmlFor='message'>How Can We Help?</label>
                        <textarea onChange={onChange('message')} value={message} rows='4' className='form-control text-primary' id='message' aria-describedby='message'></textarea>
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
                        <input onChange={onChange('first_name')} value={first_name} type='text' className='form-control text-primary' id='first_name' aria-describedby='firstName' />
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <div className='form-group'>
                        <label htmlFor='last_name'>Last Name</label>
                        <input onChange={onChange('last_name')} value={last_name} type='text' className='form-control text-primary' id='last_name' aria-describedby='lastName' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input onChange={onChange('email')} value={email} type='email' className='form-control text-primary' id='email' aria-describedby='email' />
                    </div>
                </div>
                <div className='col-md-12 col-lg-6'>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input onChange={onChange('phone')} value={phone} type='tel' className='form-control text-primary' id='phone' aria-describedby='phone' />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor='reason'>Reason for Contact</label>
                <select onChange={onChange('reason')} className="form-control text-primary" id="reason" name="reason">
                    <option value=''>Select One</option>
                    <option value='Property Inquiry'>Property Inquiry</option>
                    <option value='Property Application'>Apply for Property</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            {conditionalInput()}
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Submit</button>
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
        <div className='text-primary my-5'>
            <div className='container'>
                {showError()}
                {showSuccess()}
                <div className='row'>
                    <div className='col-12 col-lg-8 order-1 order-lg-0'>
                        <div className='d-block d-lg-none'>
                            <br />
                            <br />
                        </div>
                        <h1 className='text-center'>Send Us A Message</h1>
                        <hr />
                        {contactForm()}
                    </div>
                    <div className='col-12 col-lg-4 order-0 order-lg-1 text-center'>
                        <div>
                            <h1>Forms</h1>
                            <hr />
                            {forms.length > 0 && forms.map((form, i) => (
                                <div key={i}>
                                    <a href={`${form.file.url}`} target='_blank' rel="noopener noreferrer">{form.name}</a>
                                </div>
                            ))}
                        </div>
                        <br />
                        <br />
                        <div>
                            <h1>Contact Info</h1>
                            <hr />
                            <h6>Telephone</h6>
                            <a href="tel:1234567890">940-600-3821</a>
                            <hr />
                            <h6>Fax</h6>
                            <a href="tel:1234567890">940-591-9918</a>
                            <hr />
                            <h6>Email</h6>
                            <a href="mailto:sample@email.com">NJAHProperties@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;