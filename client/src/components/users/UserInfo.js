import React from 'react';

const UserInfo = ({user}) => {
    const {first_name, last_name, email, role, property, createdAt, updatedAt} = user;

    const showUserInfo = () => (
        <div className='row'>
            <div className='col-6'>
                <h1>My Info</h1>
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
            {property && (
                <div className='col-6'>
                    <h1>My Property Info</h1>
                    <h6>Address</h6>
                    <p>{property.address}, {property.city}, {property.state}, {property.zip}</p>
                    <h6>Rent</h6>
                    <p>${property.rent}</p>
                    <h6>Size</h6>
                    <p>{property.size} Sq Ft</p>
                    <h6>Beds</h6>
                    <p>{property.beds}</p>
                    <h6>Baths</h6>
                    <p>{property.baths}</p>
                    <h6>View Property Page</h6>
                </div>
            )}
        </div>
    );

    return (
        <div>
            {showUserInfo()}
        </div>
    );
};

export default UserInfo;