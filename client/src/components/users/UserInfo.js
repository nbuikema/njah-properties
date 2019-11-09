import React from 'react';
import moment from 'moment';

const UserInfo = ({user}) => {
    const {first_name, last_name, email, role, property, createdAt, updatedAt} = user;

    const showUserInfo = () => (
        <div className='row'>
            <div className='col-6'>
                <h1 className='my-4'>My Info</h1>
                <hr />
                <h5>First Name: {first_name}</h5>
                <h5>Last Name: {last_name}</h5>
                <h5>Email: {email}</h5>
                <h5>Role: {role === 1 ? 'Admin' : 'Resident'}</h5>
                <h5>Joined: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
                <h5>Last Updated: {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
            </div>
            {property && (
                <div className='col-6'>
                    <h1 className='my-4'>My Property Info</h1>
                    <hr />
                    <h5>Address: {property.address}, {property.city}, {property.state}, {property.zip}</h5>
                    <h5>Rent: ${property.rent}</h5>
                    <h5>Size: {property.size} Sq Ft</h5>
                    <h5>Beds: {property.beds}</h5>
                    <h5>Baths: {property.baths}</h5>
                    <h5>View Property Page</h5>
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