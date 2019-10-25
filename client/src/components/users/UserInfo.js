import React from 'react';

const UserInfo = ({user}) => {
    const {first_name, last_name, email, role, createdAt, updatedAt} = user;

    const showUserInfo = () => (
        <div>
            <h6>First Name</h6>
            <p>{first_name}</p>
            <h6>Last Name</h6>
            <p>{last_name}</p>
            <h6>Email</h6>
            <p>{email}</p>
            <h6>Role</h6>
            <p>{role === 1 ? 'Admin' : 'Resident'}</p>
            <h6>Joined</h6>
            <p>{createdAt}</p>
            <h6>Last Updated</h6>
            <p>{updatedAt}</p>
        </div>
    );

    return (
        <div>
            {showUserInfo()}
        </div>
    );
};

export default UserInfo;