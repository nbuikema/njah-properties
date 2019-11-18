import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const UserInfo = ({user}) => {
    const {first_name, last_name, email, phone, role, property, createdAt, updatedAt} = user;

    const showUserInfo = () => (
        <div>
            <div className='row'>
                <div className='col-6'>
                    <h1 className='mt-4'>My Info</h1>
                </div>
                {property && (
                    <div className='col-6'>
                        <h1 className='mt-4'>My Property</h1>
                    </div>
                )}
            </div>
            <hr />
            <div className='row'>
                <div className='col-6'>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>First Name</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{first_name}</em></span>
                        </div>
                    </h6>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>Last Name</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{last_name}</em></span>
                        </div>
                    </h6>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>Email</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{email}</em></span>
                        </div>
                    </h6>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>Phone</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{phone}</em></span>
                        </div>
                    </h6>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>Joined</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</em></span>
                        </div>
                    </h6>
                    <h6 className='form-group row'>
                        <label className='col-sm-4 col-form-label'><strong>Last Updated</strong></label>
                        <div className='col-sm-8'>
                            <span className='form-control-plaintext text-primary'><em>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</em></span>
                        </div>
                    </h6>
                </div>
                {property && (
                    <div className='col-6'>
                        <h6 className='form-group row'>
                            <label className='col-sm-4 col-form-label'><strong>Address</strong></label>
                            <div className='col-sm-8'>
                                <span className='form-control-plaintext text-primary'><em>{property.address}, {property.city}, {property.state}, {property.zip}</em></span>
                            </div>
                        </h6>
                        <h6 className='form-group row'>
                            <label className='col-sm-4 col-form-label'><strong>Rent</strong></label>
                            <div className='col-sm-8'>
                                <span className='form-control-plaintext text-primary'><em>${property.rent}</em></span>
                            </div>
                        </h6>
                        <h6 className='form-group row'>
                            <label className='col-sm-4 col-form-label'><strong>Size</strong></label>
                            <div className='col-sm-8'>
                                <span className='form-control-plaintext text-primary'><em>{property.size} Sq Ft</em></span>
                            </div>
                        </h6>
                        <h6 className='form-group row'>
                            <label className='col-sm-4 col-form-label'><strong>Beds</strong></label>
                            <div className='col-sm-8'>
                                <span className='form-control-plaintext text-primary'><em>{property.beds}</em></span>
                            </div>
                        </h6>
                        <h6 className='form-group row'>
                            <label className='col-sm-4 col-form-label'><strong>Baths</strong></label>
                            <div className='col-sm-8'>
                                <span className='form-control-plaintext text-primary'><em>{property.baths}</em></span>
                            </div>
                        </h6>
                        <h6 className='form-group row'>
                            <label className='col-sm-12 col-form-label text-center'><Link to={`/properties/${property._id}`}><strong>View My Property's Page</strong></Link></label>
                        </h6>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div>
            {showUserInfo()}
        </div>
    );
};

export default UserInfo;