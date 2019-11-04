import React, {useState, useEffect, useCallback} from 'react';
import {readCurrentUser} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

import UserInfo from './UserInfo';
import ManageForms from './admin/ManageForms';
import ManageResidents from './admin/ManageResidents';
import ManageProperties from './admin/ManageProperties';
import Messages from './Messages';
import ResidentContact from './resident/ResidentContact';
import Maintenance from './resident/Maintenance';

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
            case 'maintenance':
                return <Maintenance />;
            case 'contact':
                return <ResidentContact />;
            case 'messages':
                return <Messages role={role} />;
            case 'addForm':
                return <ManageForms op={'Add'} />;
            case 'removeForm':
                return <ManageForms op={'Remove'} />;
            case 'addProperty':
                return <ManageProperties op={'Add'} />;
            case 'updateProperty':
                return <ManageProperties op={'Update'} />;
            case 'removeProperty':
                return <ManageProperties op={'Remove'} />;
            case 'addResident':
                return <ManageResidents op={'Add'} />;
            case 'updateResident':
                return <ManageResidents op={'Update'} />;
            case 'removeResident':
                return <ManageResidents op={'Remove'} />;
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
                        <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('info')}>
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            My Info
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('messages')}>
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            View Messages
                        </button>
                    </li>
                </ul>
                {role === 0 ? (
                    <div>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Residents</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('maintenance')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Maintenance Request
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('contact')}>
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
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Forms</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('addForm')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Add Forms
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('removeForm')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Remove Forms
                                </button>
                            </li>
                        </ul>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Properties</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('addProperty')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Add Property
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('updateProperty')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Update Property
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('removeProperty')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Remove Property
                                </button>
                            </li>
                        </ul>
                        <br />
                        <p className="font-weight-bold px-3 small pb-4 mb-0">Residents</p>
                        <ul className="nav flex-column bg-white mb-0">
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('addResident')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Add Resident
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('updateResident')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Update Resident
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark font-italic bg-light dashboard-btn" onClick={toggleSection('removeResident')}>
                                    <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    Remove Resident
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
            <div className={`page-content px-3 pt-3 ${!sidebar && 'active'}`} id="content">
                <button onClick={toggleSidebar} id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i className="fa fa-bars mr-2"></i><small className="font-weight-bold">Toggle</small></button>
                <div className='pl-3'>
                    {showSection()}
                </div>
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