import React, {useState} from 'react';
import {sendContact} from '../../core/apiContact';

const Maintenance = ({user}) => {
    const [forms, setForms] = useState([]);
    const [properties, setProperties] = useState([]);
    const [contact, setContact] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        property: user.property,
        reason: '',
        application: '',
        message: '',
        formData: new FormData()
    });
    const {first_name, last_name, email, phone, reason, property, application, message, formData} = contact;

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
        <div>
            <h2>Send Us A Message</h2>
            <br />
            {contactForm()}
        </div>
    );
};

export default Maintenance;