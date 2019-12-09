import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {readAllUsers, updateUser, deleteUser} from '../apiUsers';
import {readAllProperties} from '../../properties/apiProperties';
import {isAuth} from '../../auth/apiAuth';

const ManageResidents = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
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
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState({
        _id: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const {_id, first_name, last_name, email, phone, property, createdAt, updatedAt} = selectedUser;
    const {token} = isAuth();

    const getAllProperties = () => {
        readAllProperties().then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                setError('');
                setProperties(data);
            }
        });
    };

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
        getAllProperties();
    }, [getAllUsers]);

    const selectProperty = event => {
        let selectedId = event.target.value;
        properties.forEach((property) => {
            if(selectedId === '-1') {
                setSelectedProperty({
                    _id: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: ''
                });
            }
            if(property._id === selectedId) {
                setSelectedProperty({
                    _id: property._id,
                    address: property.address,
                    city: property.city,
                    state: property.state,
                    zip: property.zip
                });
                return;
            }
        });
    };

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

    const changeUserInfo = selected => event => {
        setError('');
        setSuccess(false);
        setSelectedUser({...selectedUser, [selected]: event.target.value});
    };
    
    const updateUserClick = event => {
        event.preventDefault();
        setError('');
        updateUser(token, selectedUser).then((data, err) => {
            if(err || !data) {
                setError('Oops! Something went wrong.');
            } else {
                if(data.err) {
                    setError(data.err);
                } else {
                    getAllUsers();
                    setSuccess('updated');
                }
            }
        });
    };

    const deleteUserClick = event => {
        event.preventDefault();
        const confirmDelete = window.confirm('Are you sure you want to delete this property? This process cannot be undone.');
        if(confirmDelete) {
            deleteUser(token, selectedUser).then((data, err) => {
                if(err || !data) {
                    setError('Oops! Something went wrong.');
                } else {
                    if(data.err) {
                        setError(data.err);
                    } else {
                        getAllUsers();
                        setSelectedUser({
                            _id: '',
                            first_name: '',
                            last_name: '',
                            email: '',
                            role: '',
                            property: '',
                            createdAt: '',
                            updatedAt: ''
                        });
                    }
                }
            });
        }
    }

    const showSelectedUserInfo = () => (
        <form>
            <div className='row mr-1'>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="user" className="col-sm-auto col-form-label mr-2"><strong>Which resident would you like to manage?</strong></label>
                    <div className="col-sm-auto">
                        <select value={_id} onChange={selectUser} className="form-control text-primary" id="selectUser">
                            <option value='-1'>Select Resident</option>
                            {users.map((user, i) => (
                                <option value={user._id} key={i}>{user.last_name}, {user.first_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="first_name" className="col-sm-3 col-form-label"><strong>First Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('first_name')} type="text" className="form-control text-primary" id="first_name" value={first_name} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="last_name" className="col-sm-3 col-form-label"><strong>Last Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('last_name')} type="text" className="form-control text-primary" id="last_name" value={last_name} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="email" className="col-sm-3 col-form-label"><strong>Email</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('email')} type="email" className="form-control text-primary" id="email" value={email} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label"><strong>Phone</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('phone')} type="text" className="form-control text-primary" id="phone" value={phone} />
                    </div>
                </div>
                <div className="form-group col-12 row form-row">
                    <label htmlFor="selectProperty" className='col-sm-auto col-form-label mr-2'><strong>Which property would you like to assign this resident to?</strong></label>
                    <div className='col-auto'>
                        <select value={property ? property : selectedProperty._id} onChange={selectProperty && changeUserInfo('property')} className="form-control text-primary" id="selectProperty" >
                            <option value='-1'>Select Property (None)</option>
                            {properties.map((property, i) => (
                                <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="createdAt" className="col-sm-3 col-form-label"><strong>Registered</strong></label>
                    <div className="col-sm-9">
                        <input type="text" disabled className="form-control text-primary" id="createdAt" value={createdAt.length > 0 ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') : ''} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="updatedAt" className="col-sm-3 col-form-label"><strong>Last Updated</strong></label>
                    <div className="col-sm-9">
                        <input type="text" disabled className="form-control text-primary" id="updatedAt" value={updatedAt.length > 0 ? moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a') : ''} />
                    </div>
                </div>
                <div className='col-12 text-center'>
                    <button onClick={updateUserClick} type='submit' className='btn btn-primary mr-2'>Update User</button>
                    <button onClick={deleteUserClick} className='btn btn-danger ml-2'>Remove User</button>
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
            Resident was successfully {success}.
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>Manage Residents</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {showSuccess()}
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageResidents;