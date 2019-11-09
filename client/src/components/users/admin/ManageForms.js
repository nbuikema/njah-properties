import React, {useState, useEffect} from 'react';
import {createForm, deleteForm} from '../apiUsers';
import {readAllForms} from '../../core/apiContact';
import {isAuth} from '../../auth/apiAuth';

const ManageForms = ({op}) => {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState({
        _id: '',
        name: '',
        file: {}
    });
    const [newForm, setNewForm] = useState({
        name: '',
        file: '',
        formData: new FormData()
    });
    const {name, file, formData} = newForm;
    const {token} = isAuth();

    const getAllForms = () => {
        readAllForms().then(data => {
            setForms(data);
        });
    };

    useEffect(() => {
        getAllForms();
    }, []);

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
            getAllForms();
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
                <button onClick={onSubmit} type='submit' className='btn btn-primary'>Add Form</button>
            </div>
        </form>
    );

    const selectForm = event => {
        let selectedId = event.target.value;
        forms.forEach((form) => {
            if(selectedId === '-1') {
                setSelectedForm({
                    _id: '',
                    name: '',
                    file: {}
                });
            }
            if(form._id === selectedId) {
                setSelectedForm({
                    _id: form._id,
                    name: form.name,
                    file: form.file
                });
                return;
            }
        });
    };

    const showAllFormsDropdown = () => op !== 'Add' && (
        <form>
            <div className="form-group">
                <label htmlFor="selectForm">Select Form</label>
                <select value={selectedForm._id} onChange={selectForm} className="form-control" id="selectForm">
                    <option value='-1'>Select Form</option>
                    {forms.map((form, i) => (
                        <option value={form._id} key={i}>{form.name}</option>
                    ))}
                </select>
            </div>
        </form>
    );

    const deleteFormClick = event => {
        event.preventDefault();
        deleteForm(token, selectedForm).then(() => {
            getAllForms();
            setSelectedForm({
                _id: '',
                name: '',
                file: ''
            });
        });
    }

    return (
        <div>
            <h1 className='my-4'>{op} Form</h1>
            <hr />
            {op === 'Add' && (
                contactForm()
            )}
            {op === 'Remove' && (
                <div>
                    {forms.length > 0 && showAllFormsDropdown()}
                    {selectedForm._id.length > 0 && (
                        <div>
                            <h6>Is This The Right Form?</h6>
                            <h6>
                                <a href={`${selectedForm.file}`} target='_blank' rel="noopener noreferrer">{selectedForm.name}</a>
                            </h6>
                            <div className='text-center'>
                                <button onClick={deleteFormClick} className='btn btn-danger'>Remove Form</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageForms;