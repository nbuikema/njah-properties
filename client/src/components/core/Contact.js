import React, {useState} from 'react';

const Contact = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    const {name, email, message} = values;

    const onChange = valueProp => event => {
        setValues({...values, [valueProp]: event.target.value, error: ''});
    };

    const onSubmit = event => {
        event.preventDefault();
        const data = {name, email, message};
    };

    const contactForm = () => (
        <form>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input onChange={onChange('name')} value={name} type='text' className='form-control' id='name' />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input onChange={onChange('email')} value={email} type='email' className='form-control' id='email' aria-describedby='email' />
            </div>
            <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea onChange={onChange('message')} value={message} rows='4' className='form-control' id='message' aria-describedby='message'></textarea>
            </div>
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