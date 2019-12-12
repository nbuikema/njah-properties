import React, {useState, useEffect, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {readCurrentUser} from './apiUsers';
import {isAuth} from '../auth/apiAuth';

import UserInfo from './UserInfo';
import UserDocuments from './resident/UserDocuments';
import UpdateSelf from './UpdateSelf';
import AddForms from './admin/AddForms';
import RemoveForms from './admin/RemoveForms';
import AddResidents from './admin/AddResidents';
import ManageResidents from './admin/ManageResidents';
import ResidentDocuments from './admin/ResidentDocuments';
import AddProperties from './admin/AddProperties';
import ManageProperties from './admin/ManageProperties';
import Messages from './Messages';
import ResidentContact from './resident/ResidentContact';
import Maintenance from './resident/Maintenance';

const UserDashboard = () => {
    const [section, setSection] = useState('info');
    const [sidebar, setSidebar] = useState(true);
    const [user, setUser] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        property: {},
        files: [],
        createdAt: '',
        updatedAt: ''
    });
    const [error, setError] = useState('');
    const [signedIn, setSignedIn] = useState(true);
    const {first_name, last_name, role} = user;
    const {token} = isAuth();

    const getUser = useCallback(() => {
        readCurrentUser(token).then((data, err) => {
            if(!data || err) {
                setError('Oops! Something went wrong.');
            } else {
                if(!data.user) {
                    if(typeof window !== 'undefined') {
                        localStorage.removeItem('jwt');
                        setSignedIn(false);
                    }
                } else {
                    setUser({
                        _id: data.user._id,
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        email: data.user.email,
                        phone: data.user.phone,
                        role: data.user.role,
                        property: data.user.property,
                        files: data.user.files,
                        createdAt: data.user.createdAt,
                        updatedAt: data.user.updatedAt
                    });
                    setSignedIn(true);
                }
            }
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
                return <Maintenance user={user} />;
            case 'contact':
                return <ResidentContact user={user} />;
            case 'messages':
                return <Messages role={role} />;
            case 'addForm':
                return <AddForms />;
            case 'removeForm':
                return <RemoveForms />;
            case 'addProperty':
                return <AddProperties />;
            case 'manageProperties':
                return <ManageProperties />;
            case 'addResident':
                return <AddResidents />;
            case 'manageResidents':
                return <ManageResidents />;
            case 'residentDocuments':
                return <ResidentDocuments />;
            case 'updateSelf':
                return <UpdateSelf user={user} />;
            case 'myDocuments':
                return <UserDocuments user={user} />;
            default: 
                if(!error) {
                    return <UserInfo user={user} />;
                }
        }
    };

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const showError = () => (
        <div className='container'>
            <div className='alert alert-danger mt-5' style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        </div>
    );

    const showDashboard = () => (
        <div className='text-primary'>
            {showError()}
                {!error && (
                    <div className={`vertical-nav bg-light ${!sidebar && 'dashboard-active'}`} id="sidebar">
                    <div className="py-3 px-3 bg-white shadow-sm">
                        <div className="media d-flex align-items-center">
                            <div className="media-body">
                                <h4 className="m-0 bg-white">{first_name} {last_name}</h4>
                                <p className="font-weight-light mb-0 bg-white">{role === 1 ? 'Admin' : 'Resident'}</p>
                            </div>
                        </div>
                    </div>
                    <p className="font-weight-bold px-3 pb-1 mt-4 mb-0">Main</p>
                    <ul className="nav flex-column bg-white mb-0">
                        <li className="nav-item">
                            <button className={`nav-link dashboard-btn bg-light ${section === 'info' && 'active'}`} onClick={toggleSection('info')}>
                                <i className="fas fa-info-circle mr-3 text-primary fa-fw selector"></i>
                                My Info
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link dashboard-btn bg-light ${section === 'updateSelf' && 'active'}`} onClick={toggleSection('updateSelf')}>
                                <i className="fas fa-pencil-alt mr-3 text-primary fa-fw selector"></i>
                                Update My Info
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link dashboard-btn bg-light ${section === 'messages' && 'active'}`} onClick={toggleSection('messages')}>
                                <i className="fas fa-inbox mr-3 text-primary fa-fw selector"></i>
                                View Messages
                            </button>
                        </li>
                    </ul>
                    {role === 0 ? (
                        <div>
                            <br />
                            <p className="font-weight-bold px-3 pb-1 mb-0">Residents</p>
                            <ul className="nav flex-column bg-white mb-0">
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'myDocuments' && 'active'}`} onClick={toggleSection('myDocuments')}>
                                        <i className="fas fa-file mr-3 text-primary fa-fw selector"></i>
                                        My Documents
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'maintenance' && 'active'}`} onClick={toggleSection('maintenance')}>
                                        <i className="fa fa-tools mr-3 text-primary fa-fw selector"></i>
                                        Maintenance
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'contact' && 'active'}`} onClick={toggleSection('contact')}>
                                        <i className="fa fa-envelope mr-3 text-primary fa-fw selector"></i>
                                        Contact Property
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                    {role === 1 ? (
                        <div>
                            <br />
                            <p className="font-weight-bold px-3 pb-1 mb-0">Forms</p>
                            <ul className="nav flex-column bg-white mb-0">
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'addForm' && 'active'}`} onClick={toggleSection('addForm')}>
                                        <i className="fas fa-plus mr-3 text-primary fa-fw selector"></i>
                                        Add Form
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'removeForm' && 'active'}`} onClick={toggleSection('removeForm')}>
                                        <i className="fas fa-minus mr-3 text-primary fa-fw selector"></i>
                                        Remove Form
                                    </button>
                                </li>
                            </ul>
                            <br />
                            <p className="font-weight-bold px-3 pb-1 mb-0">Properties</p>
                            <ul className="nav flex-column bg-white mb-0">
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'addProperty' && 'active'}`} onClick={toggleSection('addProperty')}>
                                        <i className="fas fa-plus mr-3 text-primary fa-fw selector"></i>
                                        Add Property
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'manageProperties' && 'active'}`} onClick={toggleSection('manageProperties')}>
                                        <i className="fas fa-edit mr-3 text-primary fa-fw selector"></i>
                                        Manage Properties
                                    </button>
                                </li>
                            </ul>
                            <br />
                            <p className="font-weight-bold px-3 pb-1 mb-0">Residents</p>
                            <ul className="nav flex-column bg-white mobile-mb">
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'addResident' && 'active'}`} onClick={toggleSection('addResident')}>
                                        <i className="fas fa-plus mr-3 text-primary fa-fw selector"></i>
                                        Add Resident
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'manageResidents' && 'active'}`} onClick={toggleSection('manageResidents')}>
                                        <i className="fas fa-user-edit mr-3 text-primary fa-fw selector"></i>
                                        Manage Residents
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link dashboard-btn bg-light ${section === 'residentDocuments' && 'active'}`} onClick={toggleSection('residentDocuments')}>
                                        <i className="fas fa-file-upload mr-3 text-primary fa-fw selector"></i>
                                        Upload Files
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                    </div>
                )}
            <div className={`page-content px-3 pt-3 mb-4 bg-light ${!sidebar && 'dashboard-active'}`} id="content">
                {!error && <button onClick={toggleSidebar} id="sidebarCollapse" type="button" className="btn btn-white bg-white text-primary rounded-pill shadow-sm px-4"><i className={`${sidebar && 'fas fa-arrow-left'} ${!sidebar && 'fas fa-arrow-right'} mr-2`}></i><small className="font-weight-bold">{sidebar ? 'Hide Menu' : 'Show Menu'}</small></button>}
                <div className='pl-3 dashboard-page'>
                    {showSection()}
                </div>
            </div>
        </div>
    );

    const signedInRedirect = () => !signedIn ? (
        <Redirect to='/signin' />
    ) : null;

    return (
        <div>
            {showDashboard()}
            {signedInRedirect()}
        </div>
    );
};

export default UserDashboard;