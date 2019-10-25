import React, {useState, useEffect, useCallback} from 'react';
import {readCurrentUser} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

import UserInfo from './UserInfo';

const UserDashboard = () => {
    const [dashboard, setDashboard] = useState('info');
    const [sidebar, setSidebar] = useState(true);
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        createdAt: '',
        updatedAt: ''
    });
    const {first_name, last_name, role} = user;
    const {token} = isAuth();

    const getUser = useCallback(() => {
        readCurrentUser(token).then(data => {
            setUser({
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                role: data.user.role,
                createdAt: data.user.createdAt,
                updatedAt: data.user.updatedAt
            });
        });
    }, [token]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const setSection = section => event => {
        event.preventDefault();
        setDashboard(`${section}`);
    };

    const showSection = () => {
        if(dashboard === 'info') {
            return <UserInfo user={user} />
        } else if(dashboard ==='admin') {
            return <div>Admin Page</div>
        }
    };

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const showDashboard = () => (
        <div>
            <div className={`vertical-nav bg-white ${!sidebar && 'active'}`} id="sidebar">
                <div className="py-4 px-3 mb-4 bg-light">
                    <div className="media d-flex align-items-center">
                    <div className="media-body">
                        <h4 className="m-0">{first_name} {last_name}</h4>
                        <p className="font-weight-light text-muted mb-0">{role === 1 ? 'Admin' : 'Resident'}</p>
                    </div>
                    </div>
                </div>

                <p className="font-weight-bold px-3 small pb-4 mb-0">Main</p>
                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <button className="nav-link text-dark font-italic bg-light" onClick={setSection('info')}>
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            Info
                        </button>
                    </li>
                </ul>

                <br />

                <p className="font-weight-bold px-3 small pb-4 mb-0">Admin</p>
                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <button className="nav-link text-dark font-italic bg-light" onClick={setSection('admin')}>
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            Manage Properties
                        </button>
                    </li>
                </ul>
            </div>
            <div className={`page-content p-5 ${!sidebar && 'active'}`} id="content">
                <button onClick={toggleSidebar} id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i className="fa fa-bars mr-2"></i><small className="font-weight-bold">Toggle</small></button>

                {showSection()}
            </div>
        </div>
    );

    return (
        <div>
            {showDashboard()}
        </div>
    );
};

export default UserDashboard;