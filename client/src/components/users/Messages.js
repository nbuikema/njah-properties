import React, {useState, useEffect, useCallback} from 'react';
import {readAllMessages} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

const Messages = ({role}) => {
    const [messages, setMessages] = useState([]);
    const {token} = isAuth();

    const getMessages = useCallback(() => {
        if(role === 1) {
            readAllMessages(token).then(data => {
                setMessages(data);
            });
        }
    }, [token, role]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    return (
        <div>
            <h1>Messages</h1>
            {messages.map((message, i) => (
                <div key={i}>
                <hr />
                    <div className='row'>
                        <div className='col-6'>
                            <h6>Name: {message.last_name}, {message.first_name}</h6>
                            <h6>Email: {message.email}</h6>
                            <h6>Phone: {message.phone}</h6>
                            <h6>Sent: {message.createdAt}</h6>
                        </div>
                        <div className='col-6'>
                            <h6>Reason: {message.reason}</h6>
                            {message.property && (
                                <h6>Property:{console.log(message.property)} {message.property.address}, {message.property.city}, {message.property.state}, {message.property.zip}</h6>
                            )}
                            {message.application && (
                                <h6>Application: <a href={`${message.application.url}`} target='_blank'>View Application</a></h6>
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