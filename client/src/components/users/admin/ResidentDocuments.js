import React, {useState, useEffect, useCallback} from 'react';
import {readAllUsers, uploadFile} from '../apiUsers';
import {isAuth} from '../../auth/apiAuth';

const ResidentDocuments = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        first_name: '',
        last_name: ''
    });
    const [newForm, setNewForm] = useState({
        name: '',
        file: '',
        formData: new FormData()
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {_id} = selectedUser;
    const {name, formData} = newForm;
    const {token} = isAuth();

    const getAllUsers = useCallback(() => {
        readAllUsers(token).then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                setError('');
                setUsers(data);
            }
        });
    }, [token]);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const selectUser = event => {
        let selectedId = event.target.value;
        setSuccess(false);
        users.forEach((user) => {
            if(selectedId === '-1') {
                setSelectedUser({
                    _id: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    role: '',
                    property: '',
                    createdAt: '',
                    updatedAt: ''
                });
            }
            if(user._id === selectedId) {
                setSelectedUser({
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    property: user.property,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                });
                return;
            }
        });
    };

    const onFileChange = selected => event => {
        let value = selected === 'file' ? event.target.files[0] : event.target.value;
        setError('');
        setSuccess(false);
        setNewForm({...newForm, [selected]: value});
        formData.set(selected, value);
    };

    const onFileSubmit = event => {
        event.preventDefault();
        if(!selectedUser._id) {
            return setError('You must select a resident.');
        }
        if(!isFileSelected(0)) {
            return setError('You must attach a file.');
        }
        uploadFile(token, selectedUser._id, formData).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    setNewForm({
                        name: '',
                        file: '',
                        formData: new FormData()
                    });
                    document.getElementById("file").value = null;
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
    };

    const uploadFileForm = () => (
        <form encType="multipart/form-data">
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="user" className="col-sm-auto col-form-label mr-2"><strong>Which resident would you like to upload a file for?</strong></label>
                    <div className="col-sm-auto">
                        <select value={_id} onChange={selectUser} className="form-control text-primary" id="selectUser">
                            <option value='-1'>Select Resident</option>
                            {users.map((user, i) => (
                                <option value={user._id} key={i}>{user.last_name}, {user.first_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="name" className="col-sm-3 col-form-label"><strong>Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={onFileChange('name')} type="text" className="form-control" id="name" value={name} />
                    </div>
                </div>
                <div className='form-group col-12 row form-row'>
                    <label htmlFor='file' className="col-sm-3 col-form-label"><strong>Upload File</strong></label>
                    <div className='col-sm-9'>
                        {isFileSelected(0) ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>}
                        <input onChange={onFileChange('file')} type='file' accept='*' id='file' className='mt-1 text-primary file' />
                    </div>
                </div>
                <div className='w-100 text-center'>
                    <button onClick={onFileSubmit} type='submit' className='btn btn-primary'>Upload File</button>
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
            File was successfully uploaded to resident {selectedUser.first_name} {selectedUser.last_name}.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Upload Resident Files</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {uploadFileForm()}
        </div>
    );
};

export default ResidentDocuments;