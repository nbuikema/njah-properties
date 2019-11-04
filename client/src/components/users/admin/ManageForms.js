import React, {useState, useEffect} from 'react';
import {createForm} from '../apiUsers';
import {isAuth} from '../../auth/apiAuth';

const ManageForms = ({op}) => {
    const [newForm, setNewForm] = useState({
        name: '',
        file: '',
        formData: new FormData()
    });
    const {name, file, formData} = newForm;
    const {token} = isAuth();

    const onChange = selected => event => {
        let value = selected === 'file' ? event.target.files[0] : event.target.value;
        setNewForm({...newForm, [selected]: value});
        formData.set(selected, value);
    };

    const onSubmit = event => {
        event.preventDefault();
        createForm(token, formData).then(data => {
            setNewForm({
                name: '',
                file: '',
                formData: new FormData()
            });
        });
    };

    const contactForm = () => (
        <form encType="multipart/form-data">
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                    <input onChange={onChange('name')} type="text" className="form-control" id="name" value={name} />
                </div>
            </div>
            <div className='form-group row'>
            <label htmlFor='file' className="col-sm-4 col-form-label">Upload File</label>
            <div className='col-sm-8'>
                <input onChange={onChange('file')} type='file' accept='*' id='file' />
            </div>
        </div>
            <div className='text-center'>
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Get In Touch</button>
            </div>
        </form>
    );

    return (
        <div>
            <h1>{op} Forms</h1>
            {op === 'Add' && (
                contactForm()
            )}
        </div>
    );
};

export default ManageForms;