import React, {useState, useEffect, useCallback} from 'react';
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

    const showAllPropertiesDropdown = () => op === 'Update' && (
        <div className="form-group row">
            <label htmlFor="selectProperty" className='col-sm-4 col-form-label'>Assign Property</label>
            <div className='col-sm-8'>
                <select value={selectedUser.property.length > 0 ? selectedUser.property : selectedProperty._id} onChange={selectProperty, changeUserInfo('property')} className="form-control" id="selectProperty">
                    <option value='-1'>Select Property (None)</option>
                    {properties.map((property, i) => (
                        <option value={property._id} key={i}>{property.address}, {property.city}, {property.state}, {property.zip}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    const showAllUsersDropdown = () => op !== 'Add' && (
        <form>
            <div className="form-group">
                <label htmlFor="selectUser">Select User</label>
                <select value={selectedUser._id} onChange={selectUser} className="form-control" id="selectUser">
                    <option value='-1'>Select User</option>
                    {users.map((user, i) => (
                        <option value={user._id} key={i}>{user.last_name}, {user.first_name}</option>
                    ))}
                </select>
            </div>
        </form>
    );

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
            <div className="form-group row">
                <label htmlFor="id" className="col-sm-4 col-form-label">ID</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control" id="id" value={op === 'Add' ? `${newUser._id}` : `${selectedUser._id}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="first_name" className="col-sm-4 col-form-label">First Name</label>
                <div className="col-sm-8">
                    <input onChange={changeUserInfo('first_name')} type="text" className="form-control" id="first_name" value={op === 'Add' ? `${newUser.first_name}` : `${selectedUser.first_name}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="last_name" className="col-sm-4 col-form-label">Last Name</label>
                <div className="col-sm-8">
                    <input onChange={changeUserInfo('last_name')} type="text" className="form-control" id="last_name" value={op === 'Add' ? `${newUser.last_name}` : `${selectedUser.last_name}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                    <input onChange={changeUserInfo('email')} type="email" className="form-control" id="email" value={op === 'Add' ? `${newUser.email}` : `${selectedUser.email}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="role" className="col-sm-4 col-form-label">Role</label>
                <div className="col-sm-8">
                    <input onChange={changeUserInfo('role')} type="text" className="form-control" id="role" value={op === 'Add' ? `${newUser.role}` : `${selectedUser.role}`} />
                </div>
            </div>
            {showAllPropertiesDropdown()}
            <div className="form-group row">
                <label htmlFor="createdAt" className="col-sm-4 col-form-label">Registered</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control" id="createdAt" value={op === 'Add' ? `${newUser.createdAt}` : `${selectedUser.createdAt}`} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="updatedAt" className="col-sm-4 col-form-label">Last Updated</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control" id="updatedAt" value={op === 'Add' ? `${newUser.updatedAt}` : `${selectedUser.updatedAt}`} />
                </div>
            </div>
            <div className='text-center'>
                {op === 'Update' && <button onClick={updateUserClick} type='submit' className='btn btn-primary'>Update User</button>}
                {op === 'Remove' && <button onClick={deleteUserClick} className='btn btn-danger'>Remove User</button>}
            </div>
        </form>
    );

    return (
        <div>
            <h1>{op} Residents</h1>
            {showAllUsersDropdown()}
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageResidents;