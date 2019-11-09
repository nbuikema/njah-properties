import React, {useState, useEffect, useCallback} from 'react';
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
    const {type, reason, sort, user} = filters;
    const {token} = isAuth();

    const getMessages = useCallback(() => {
        if(role === 1) {
            readAllMessages(token).then(data => {
                setMessages(data);
            });
        } else {
            readMyMessages(token).then(data => {
                setMessages(data);
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
        <form className='mt-3'>
            <div className='form-row'>
                <div className='form-group col-auto'>
                    <select value={type} onChange={changeFilters('type')} id="type" className="form-control">
                        <option value=''>Type (Any)</option>
                        <option value='General'>General Contact</option>
                        <option value='Resident'>Resident Contact</option>
                        <option value='Maintenance'>Resident Maintenance</option>
                    </select>
                </div>
                {type.length > 0 && (
                    <div className='form-group col-auto'>
                        {type === 'General' && (
                            <select value={reason} onChange={changeFilters('reason')} id="reason" className="form-control">
                                <option value=''>Reason (Any)</option>
                                <option value='Property Inquiry'>Property Inquiry</option>
                                <option value='Property Application'>Property Application</option>
                                <option value='Other'>Other</option>
                            </select>
                        )}
                        {(type === 'Resident' || type === 'Maintenance') && (
                            <select value={user} onChange={changeFilters('user')} id="user" className="form-control">
                                <option value=''>Resident (Any)</option>
                                {users.map((user, i) => (
                                    <option value={`${user._id}`} key={i}>{user.last_name}, {user.first_name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
                <div className='form-group col-auto'>
                    <select value={sort} onChange={changeFilters('sort')} id="sort" className="form-control">
                        <option value=''>Sort By</option>
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

    return (
        <div>
            <h1 className='my-4'>{role === 0 && 'Sent'} Messages</h1>
            <hr />
            {role === 1 && showFilters()}
            {filteredMessages.length === 0 && messages.map((message, i) => (
                <div key={i}>
                    {i !== 0 && <hr />}
                    <div className='row'>
                        <div className='col-6'>
                            <h6>Name: {message.last_name}, {message.first_name}</h6>
                            <h6>Email: {message.email}</h6>
                            <h6>Phone: {message.phone}</h6>
                            <h6>Sent: {message.createdAt}</h6>
                        </div>
                        <div className='col-6'>
                            <h6>Type: {message.type}</h6>
                            <h6>Reason: {message.reason}</h6>
                            {message.property && (
                                <h6>Property: {message.property.address}, {message.property.city}, {message.property.state}, {message.property.zip}</h6>
                            )}
                            {message.application && (
                                <h6>Application: <a href={`${message.application.url}`} target='_blank' rel="noopener noreferrer">View Application</a></h6>
                            )}
                            <h6>Message: {message.message}</h6>
                        </div>
                    </div>
                </div>
            ))}
            {filteredMessages.length > 0 && filteredMessages.map((message, i) => (
                <div key={i}>
                    {i !== 0 && <hr />}
                    <div className='row'>
                        <div className='col-6'>
                            <h6>Name: {message.last_name}, {message.first_name}</h6>
                            <h6>Email: {message.email}</h6>
                            <h6>Phone: {message.phone}</h6>
                            <h6>Sent: {message.createdAt}</h6>
                        </div>
                        <div className='col-6'>
                            <h6>Type: {message.type}</h6>
                            <h6>Reason: {message.reason}</h6>
                            {message.property && (
                                <h6>Property: {message.property.address}, {message.property.city}, {message.property.state}, {message.property.zip}</h6>
                            )}
                            {message.application && (
                                <h6>Application: <a href={`${message.application.url}`} target='_blank' rel="noopener noreferrer">View Application</a></h6>
                            )}
                            <h6>Message: {message.message}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;