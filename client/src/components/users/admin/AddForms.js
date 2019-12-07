import React, {useState} from 'react';
import {createForm} from '../apiUsers';
import {isAuth} from '../../auth/apiAuth';

const ManageForms = () => {
    const [newForm, setNewForm] = useState({
        name: '',
        file: '',
        formData: new FormData()
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {name, formData} = newForm;
    const {token} = isAuth();

    const onChange = selected => event => {
        let value = selected === 'file' ? event.target.files[0] : event.target.value;
        setError('');
        setSuccess(false);
        setNewForm({...newForm, [selected]: value});
        formData.set(selected, value);
    };

    const onSubmit = event => {
        event.preventDefault();
        if(!isFileSelected(0)) {
            return setError('You must attach a file.');
        }
        createForm(token, formData).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.error) {
                    setError(data.error);
                } else {
                    setNewForm({
                        name: '',
                        file: '',
                        formData: new FormData()
                    });
                    setError('');
                    setSuccess(true);
                }
            }
        });
    };

    const isFileSelected = i => {
        if(document.getElementsByClassName('file')[i]) {
            let inputIndex = document.getElementsByClassName('file')[i].value;
            return inputIndex.length > 0 ? true : false;
        }
    }

    const contactForm = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="name" className="col-sm-3 col-form-label"><strong>Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onChange('name')} type="text" className="form-control" id="name" value={name} />
                    </div>
                </div>
                <div className='form-group col-12 row form-row'>
                    <label htmlFor='file' className="col-sm-3 col-form-label"><strong>Upload File</strong></label>
                    <div className='col-sm-9'>
                        {isFileSelected(0) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                        <input onChange={onChange('file')} type='file' accept='*' id='file' className='mt-1 text-primary file' />
                    </div>
                </div>
                <div className='w-100 text-center'>
                    <button onClick={onSubmit} type='submit' className='btn btn-primary'>Add Form</button>
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
            Form was successfully added.
        </div>
    );

    return (
        <div>
            <h1 className='my-4'>Add Form</h1>
            <hr />
            {showError()}
            {showSuccess()}
            {contactForm()}
        </div>
    );
};

export default ManageForms;