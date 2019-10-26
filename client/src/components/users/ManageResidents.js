import React, {useState, useEffect, useCallback} from 'react';
import {readAllUsers} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

const ManageResidents = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        createdAt: '',
        updatedAt: ''
    });
    const {token} = isAuth();

    const getAllUsers = useCallback(() => {
        readAllUsers(token).then(data => {
            setUsers(data);
        });
    }, [token]);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

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
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                });
                return;
            }
        });
    };

    const showAllUsersDropdown = () => (
        <form>
            <div className="form-group">
                <label htmlFor="selectUser">Select User</label>
                <select onChange={selectUser} className="form-control" id="selectUser">
                    <option value='-1'>Select User</option>
                    {users.map((user, i) => (
                        <option value={`${user._id}`} key={i}>{user.last_name}, {user.first_name}</option>
                    ))}
                </select>
            </div>
        </form>
    );

    const showSelectedUserInfo = () => (
        <div>
            <h6>User ID</h6>
            <p>{selectedUser._id}</p>
            <h6>First Name</h6>
            <p>{selectedUser.first_name}</p>
            <h6>Last Name</h6>
            <p>{selectedUser.last_name}</p>
            <h6>Email</h6>
            <p>{selectedUser.email}</p>
            <h6>Role</h6>
            <p>{selectedUser.role === 1 && 'Admin'}{selectedUser.role === 0 && 'Resident'}</p>
            <h6>Joined</h6>
            <p>{selectedUser.createdAt}</p>
            <h6>Last Updated</h6>
            <p>{selectedUser.updatedAt}</p>
            <button>Update User</button>
            <button>Remove User</button>
        </div>
    );

    return (
        <div>
            {showAllUsersDropdown()}
            {showSelectedUserInfo()}
        </div>
    );
};

export default ManageResidents;