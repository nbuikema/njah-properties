import React from 'react';

const UserDocuments = ({user}) => {
    const {files} = user;

    const showUserFiles = () => (
        <div className='fix-info'>
            {files.map((file, i) => (
                <div key={i}>
                    <a href={`${file.url}`} target='_blank' rel="noopener noreferrer">{file.name}</a>
                </div>
            ))}
        </div>
    );

    return (
        <div className='my-4'>
            <div className='row'>
                <div className='col-auto'>
                    <h1>My Documents</h1>
                </div>
            </div>
            <hr />
            {showUserFiles()}
        </div>
    );
};

export default UserDocuments;