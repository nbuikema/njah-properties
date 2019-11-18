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
    const {name, formData} = newForm;
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
                        {isFileSelected(0) ? <i className="fas fa-check text-success mr-2"></i> : <i class="fas fa-times text-danger mr-2"></i>}
                        <input onChange={onChange('file')} type='file' accept='*' id='file' className='mt-1 text-primary file' />
                    </div>
                </div>
                <div className='w-100 text-center'>
                    <button onClick={onSubmit} type='submit' className='btn btn-primary'>Add Form</button>
                </div>
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
            <div className='row mr-1'>
                <div className="form-group col-auto row form-row">
                    <label className="col-sm-auto col-form-label mr-2" htmlFor="selectForm"><strong>Select Form</strong></label>
                    <div className="col-sm-auto">
                        <select value={selectedForm._id} onChange={selectForm} className="form-control text-primary" id="selectForm">
                            <option value='-1'>Select Form</option>
                            {forms.map((form, i) => (
                                <option value={form._id} key={i}>{form.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {selectedForm._id.length > 0 && (
                    <div className='form-group col-auto row form-row'>
                        <label className="col-sm-auto col-form-label mr-2" htmlFor="selectForm"><strong>Is this the right form?</strong></label>
                        <div className="col-sm-auto">
                            <h6><a href={`${selectedForm.file.url}`} className='form-control text-primary' target='_blank' rel="noopener noreferrer">{selectedForm.name}</a></h6>
                        </div>
                    </div>
                )}
                <div className='col-12 text-center'>
                    <button onClick={deleteFormClick} className='btn btn-danger'>Remove Form</button>
                </div>
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
                </div>
            )}
        </div>
    );
};

export default ManageForms;