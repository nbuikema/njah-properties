import React, {useState, useEffect} from 'react';
import {deleteForm} from '../apiUsers';
import {readAllForms} from '../../core/apiContact';
import {isAuth} from '../../auth/apiAuth';

const RemoveForms = () => {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState({
        _id: '',
        name: '',
        file: {}
    });
    const [errors, setErrors] = useState({
        loading: '',
        input: ''
    });
    const [success, setSuccess] = useState(false);
    const {token} = isAuth();

    const getAllForms = () => {
        readAllForms().then((data, err) => {
            if(!data || err) {
                setErrors({...errors, loading: 'Oops! Something went wrong.'});
            } else {
                setForms(data);
            }
        });
    };

    useEffect(() => {
        getAllForms();
    }, []);

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

    const showAllFormsDropdown = () => (
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

    const showError = () => (
        <div>
            <div className='alert alert-danger' style={{display: errors.loading ? '' : 'none'}}>
                {errors.loading}
            </div>
            <div className='alert alert-danger mt-1' style={{display: errors.input ? '' : 'none'}}>
                {errors.input}
            </div>
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            You will receive an email shortly with instructions for resetting your password.
        </div>
    );

    return (
        <div>
            <h1 className='my-4'>Remove Form</h1>
            <hr />
            {showError()}
            {showSuccess()}
            {forms.length > 0 && showAllFormsDropdown()}
        </div>
    );
};

export default RemoveForms;