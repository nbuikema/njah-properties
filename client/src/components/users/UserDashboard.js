import React, {useState, useEffect, useCallback} from 'react';
import {readCurrentUser} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

import UserInfo from './UserInfo';
import ManageResidents from './ManageResidents';
import ManageProperties from './ManageProperties';

const UserDashboard = () => {
    const [section, setSection] = useState('info');
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

    const toggleSection = selected => event => {
        event.preventDefault();
        setSection(`${selected}`);
    };

    const showSection = () => {
        switch(section) {
            case 'info':
                return <UserInfo user={user} />;
            case 'maintenance':
                return <div>Request Maintenance</div>;
            case 'contact':
                return <div>Contact Us</div>;
            case 'manageresidents':
                return <ManageResidents />;
            case 'manageproperties':
                return <ManageProperties />;
            default: 
                return <UserInfo user={user} />;
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
                        <button className="nav-link text-dark font-italic bg-light" onClick={toggleSection('info')}>
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            My Info
                        </button>
                    </li>
                </ul>
                {role === 0 ? (
                    <div>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Residents</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light" onClick={toggleSection('maintenance')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Maintenance Request
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light" onClick={toggleSection('contact')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Contact Us
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : null}
                {role === 1 ? (
                    <div>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Property Management</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light" onClick={toggleSection('manageproperties')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Add Property
                                </button>
                            </li>
                        </ul>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Resident Management</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light" onClick={toggleSection('manageresidents')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Update/Delete Residents
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : null}
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