import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {readAllUsers, updateUser, deleteUser} from '../apiUsers';
import {readAllProperties} from '../../properties/apiProperties';
import {isAuth} from '../../auth/apiAuth';

const ManageResidents = ({op}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        property: '',
        createdAt: '',
        updatedAt: ''
    });
    const [newUser, setNewUser] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
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
    const {token} = isAuth();

    const getAllProperties = useCallback(() => {
        readAllProperties().then(data => {
            setProperties(data);
        });
    }, []);

    const getAllUsers = useCallback(() => {
        readAllUsers(token).then(data => {
            setUsers(data);
        });
    }, [token]);

    useEffect(() => {
        getAllUsers();
        getAllProperties();
    }, [getAllUsers, getAllProperties]);

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
        users.forEach((user) => {
            if(selectedId === '-1') {
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
            if(user._id === selectedId) {
                setSelectedUser({
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
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
        op === 'Add' ? setNewUser({...newUser, [selected]: event.target.value}) : setSelectedUser({...selectedUser, [selected]: event.target.value});
    };
    
    const updateUserClick = event => {
        event.preventDefault();
        updateUser(token, selectedUser).then(() => {
            getAllUsers();
        });
    }

    const deleteUserClick = event => {
        event.preventDefault();
        deleteUser(token, selectedUser).then(() => {
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
        });
    }

    const showSelectedUserInfo = () => (
        <form>
            <div className='row mr-1'>
                {op !== 'Add' && (
                    <div className="form-group col-12 row form-row">
                        <label htmlFor="user" className="col-sm-auto col-form-label mr-2"><strong>Which resident would you like to {op}?</strong></label>
                        <div className="col-sm-auto">
                            <select value={selectedUser._id} onChange={selectUser} className="form-control text-primary" id="selectUser">
                                <option value='-1'>Select User</option>
                                {users.map((user, i) => (
                                    <option value={user._id} key={i}>{user.last_name}, {user.first_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="first_name" className="col-sm-3 col-form-label"><strong>First Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('first_name')} type="text" className="form-control text-primary" id="first_name" value={op === 'Add' ? `${newUser.first_name}` : `${selectedUser.first_name}`} disabled={op === 'Remove' ? true : false} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="last_name" className="col-sm-3 col-form-label"><strong>Last Name</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('last_name')} type="text" className="form-control text-primary" id="last_name" value={op === 'Add' ? `${newUser.last_name}` : `${selectedUser.last_name}`} disabled={op === 'Remove' ? true : false} />
                    </div>
                </div>
                <div className="form-group col-12 col-lg-6 row form-row">
                    <label htmlFor="email" className="col-sm-3 col-form-label"><strong>Email</strong></label>
                    <div className="col-sm-9">
                        <input onChange={changeUserInfo('email')} type="email" className="form-control text-primary" id="email" value={op === 'Add' ? `${newUser.email}` : `${selectedUser.email}`} disabled={op === 'Remove' ? true : false} />
                    </div>
                </div>
                {op !== 'Add' && (
                    <div className="form-group col-12 col-lg-6 row form-row">
                        <label htmlFor="role" className="col-sm-3 col-form-label"><strong>Role</strong></label>
                        <div className="col-sm-9">
                            <input onChange={changeUserInfo('role')} type="text" className="form-control text-primary" id="role" value={op === 'Add' ? `${newUser.role}` : `${selectedUser.role}`} disabled={op === 'Remove' ? true : false} />
                        </div>
                    </div>
                )}
                <div className="form-group col-12 row form-row">
                    <label htmlFor="selectProperty" className='col-sm-auto col-form-label mr-2'>Which property would you like to assign this resident to?</label>
                    <div className='col-sm-auto'>
                        <select value={selectedUser.property.length > 0 ? selectedUser.property : selectedProperty._id} onChange={selectProperty, changeUserInfo('property')} className="form-control text-primary" id="selectProperty" disabled={op === 'Remove' ? true : false}>
                            <option value='-1'>Select Property (None)</option>
                            {properties.map((property, i) => (
                                <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {op !== 'Add' && (
                    <>
                        <div className="form-group col-12 col-lg-6 row form-row">
                            <label htmlFor="createdAt" className="col-sm-3 col-form-label"><strong>Registered</strong></label>
                            <div className="col-sm-9">
                                <input type="text" disabled className="form-control text-primary" id="createdAt" value={op === 'Add' ? `${newUser.createdAt}` : `${moment(selectedUser.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                            </div>
                        </div>
                        <div className="form-group col-12 col-lg-6 row form-row">
                            <label htmlFor="updatedAt" className="col-sm-3 col-form-label"><strong>Last Updated</strong></label>
                            <div className="col-sm-9">
                                <input type="text" disabled className="form-control text-primary" id="updatedAt" value={op === 'Add' ? `${newUser.updatedAt}` : `${moment(selectedUser.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                            </div>
                        </div>
                    </>
                )}
                <div className='col-12 text-center'>
                    {op === 'Update' && <button onClick={updateUserClick} type='submit' className='btn btn-primary'>Update User</button>}
                    {op === 'Remove' && <button onClick={deleteUserClick} className='btn btn-danger'>Remove User</button>}
                </div>
            </div>
        </form>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>{op} Resident</h1>
                </div>
            </div>
            <hr />
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageResidents;