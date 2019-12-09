import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {readAllMessages, readMessagesWithQuery, readMyMessages} from './apiUsers';
import {readAllUsers} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

const Messages = ({role}) => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        reason: '',
        user: '',
        sort: ''
    });
    const [error, setError] = useState('');
    const {type, reason, sort, user} = filters;
    const {token} = isAuth();

    const getMessages = useCallback(() => {
        if(role === 1) {
            readAllMessages(token).then((data, err) => {
                if(!data || err) {
                    setError('Oops! Something went wrong.');
                } else {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setMessages(data);
                    }
                }
            });
        } else {
            readMyMessages(token).then((data, err) => {
                if(!data || err) {
                    setError('Oops! Something went wrong.');
                } else {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setMessages(data);
                    }
                }
            });
        }
    }, [token, role]);

    const getAllUsers = useCallback(() => {
        if(role === 1) {
            readAllUsers(token).then(data => {
                setUsers(data);
            });
        }
    }, [token, role]);

    useEffect(() => {
        getMessages();
        getAllUsers();
    }, [getMessages, getAllUsers]);

    const changeFilters = selected => event => {
        if(selected === 'type' && reason.length > 0) {
            setFilters({
                ...filters,
                type: event.target.value,
                reason: '',
                sort: ''
            });
        } else {
            setFilters({...filters, [selected]: event.target.value});
        }
    };

    const submitFilters = event => {
        event.preventDefault();
        let queryString = '';
        for(let filter in filters) {
            if(filters[filter]) {
                if(queryString.length > 0) {
                    if(filter === 'sort') {
                        queryString += `&sortBy=${filters[filter].split(' ')[0]}&order=${filters[filter].split(' ')[1]}`;
                    } else {
                        queryString += `&${filter}=${filters[filter]}`;
                    }
                } else {
                    if(filter === 'sort') {
                        queryString += `sortBy=${filters[filter].split(' ')[0]}&order=${filters[filter].split(' ')[1]}`;
                    } else {
                        queryString += `${filter}=${filters[filter]}`;
                    }
                }
            }
        }
        readMessagesWithQuery(queryString).then(data => {
            if(data.length === 0) {
                setFilters({
                    type: '',
                    reason: '',
                    sort: ''
                });
            }
            setFilteredMessages(data);
        });
    };

    const showFilters = () => (
        <form className='mt-2'>
            <div className='form-row'>
                <div className='form-group col-auto'>
                    <select value={type} onChange={changeFilters('type')} id="type" className="form-control text-primary">
                        <option value=''>Type (Any)</option>
                        <option value='General'>General Contact</option>
                        <option value='Resident'>Resident Contact</option>
                        <option value='Maintenance'>Resident Maintenance</option>
                    </select>
                </div>
                {type.length > 0 && (
                    <div className='form-group col-auto'>
                        {type === 'General' && (
                            <select value={reason} onChange={changeFilters('reason')} id="reason" className="form-control text-primary">
                                <option value=''>Reason (Any)</option>
                                <option value='Property Inquiry'>Property Inquiry</option>
                                <option value='Property Application'>Property Application</option>
                                <option value='Other'>Other</option>
                            </select>
                        )}
                        {(type === 'Resident' || type === 'Maintenance') && (
                            <select value={user} onChange={changeFilters('user')} id="user" className="form-control text-primary">
                                <option value=''>Resident (Any)</option>
                                {users.map((user, i) => (
                                    <option value={`${user._id}`} key={i}>{user.last_name}, {user.first_name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
                <div className='form-group col-auto'>
                    <select value={sort} onChange={changeFilters('sort')} id="sort" className="form-control text-primary">
                        <option value=''>Sort By (Default)</option>
                        <option value='createdAt desc'>Date (Newest First)</option>
                        <option value='createdAt asc'>Date (Oldest First)</option>
                    </select>
                </div>
                <div className='form-group col-auto text-center'>
                    <button onClick={submitFilters} type='submit' className='btn btn-primary'>Filter Messages</button>
                </div>
            </div>
        </form>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>{role === 1 ? 'Received' : 'My Sent'} Messages</h1>
                </div>
            </div>
            <hr />
            {showError()}
            {role === 1 && showFilters()}
            {role === 1 && <hr />}
            {filteredMessages.length === 0 && messages.map((message, i) => (
                <div key={i}>
                    {i !== 0 && <hr />}
                    <div className='row'>
                        <div className='col-6'>
                            <h6><strong>Name:</strong> {message.last_name}, {message.first_name}</h6>
                            <h6><strong>Email:</strong> {message.email}</h6>
                            <h6><strong>Phone:</strong> {message.phone}</h6>
                            <h6><strong>Sent:</strong> {moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                        </div>
                        <div className='col-6'>
                            <h6><strong>Type:</strong> {message.type}</h6>
                            <h6><strong>Reason:</strong> {message.reason}</h6>
                            {message.property && (
                                <h6><strong>Property:</strong> {message.property.address}, {message.property.city}, {message.property.state}, {message.property.zip}</h6>
                            )}
                            {message.application && (
                                <h6><strong>Application:</strong> <a href={`${message.application.url}`} target='_blank' rel="noopener noreferrer">View Application</a></h6>
                            )}
                            <h6><strong>Message:</strong> {message.message}</h6>
                        </div>
                    </div>
                </div>
            ))}
            {filteredMessages.length > 0 && filteredMessages.map((message, i) => (
                <div key={i}>
                    {i !== 0 && <hr />}
                    <div className='row'>
                        <div className='col-6'>
                            <h6><strong>Name:</strong> {message.last_name}, {message.first_name}</h6>
                            <h6><strong>Email:</strong> {message.email}</h6>
                            <h6><strong>Phone:</strong> {message.phone}</h6>
                            <h6><strong>Sent:</strong> {moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                        </div>
                        <div className='col-6'>
                            <h6><strong>Type:</strong> {message.type}</h6>
                            <h6><strong>Reason:</strong> {message.reason}</h6>
                            {message.property && (
                                <h6><strong>Property:</strong> {message.property.address}, {message.property.city}, {message.property.state}, {message.property.zip}</h6>
                            )}
                            {message.application && (
                                <h6><strong>Application:</strong> <a href={`${message.application.url}`} target='_blank' rel="noopener noreferrer">View Application</a></h6>
                            )}
                            <h6><strong>Message:</strong> {message.message}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;