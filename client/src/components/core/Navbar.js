import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/apiAuth';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {borderBottom: '2px solid #000000'};
    }
}

const Navbar = ({history}) => (
    <div className='sticky-top'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container'>
                <ul className='navbar-nav mr-auto mt-lg-0 d-block d-lg-none'>
                    <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                        <Link className='navbar-brand' to='/'>
                            NJAH Properties
                        </Link>
                    </li>
                </ul>
                <button className='navbar-toggler custom-toggler' type='button' data-toggle='collapse' data-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarToggler'>
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className='nav-link' to='/' style={isActive(history, '/')}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className='nav-link' to='/properties' style={isActive(history, '/properties')}>
                                Properties
                            </Link>
                        </li>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className='nav-link' to='/contact' style={isActive(history, '/contact')}>
                                Contact & Forms
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className='navbar-nav mx-auto mt-lg-0 d-none d-lg-block'>
                    <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                        <Link className='navbar-brand' to='/'>
                            NJAH Properties
                        </Link>
                    </li>
                </ul>
                <div className='collapse navbar-collapse' id='navbarToggler'>
                    <div className='dropdown-divider'></div>
                    {!isAuth() ? (
                        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className='nav-link' to='/signup' style={isActive(history, '/signup')}>
                                    Sign Up
                                </Link>
                            </li>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className='nav-link' to='/signin' style={isActive(history, '/signin')}>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                            {isAuth() ? (
                                <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                    <Link className='nav-link' to='/dashboard' style={isActive(history, '/dashboard')}>
                                        Dashboard
                                    </Link>
                                </li>
                            ) : null}
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <span className='nav-link' style={{cursor: 'pointer'}} onClick={() => signout(() => {history.push('/');})}>
                                    Sign Out
                                </span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    </div>
);

export default withRouter(Navbar);