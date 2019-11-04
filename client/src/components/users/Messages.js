import React from 'react';

import Message from './Message';

const Messages = ({role}) => (
    <div>
        messages {role}
        <Message />
    </div>
);

export default Messages;