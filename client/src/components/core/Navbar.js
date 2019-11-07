import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/apiAuth';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return true;
    }
}

const Navbar = ({history}) => (
    <div className='sticky-top'>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <div className='navbar-brand abs'>
                <Link className='brand-fix' to='/'>
                    NJAH Properties
                </Link>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="collapsingNavbar">
                <ul class="navbar-nav">
                    <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                        <Link className={`nav-link ${isActive(history, '/') && 'active'}`} to='/'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                        <Link className={`nav-link ${isActive(history, '/properties') && 'active'}`} to='/properties'>
                            Properties
                        </Link>
                    </li>
                    <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                        <Link className={`nav-link ${isActive(history, '/contact') && 'active'}`} to='/contact'>
                            Contact & Forms
                        </Link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    {!isAuth() ? (
                        <>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className={`nav-link ${isActive(history, '/signup') && 'active'}`} to='/signup'>
                                    Sign Up
                                </Link>
                            </li>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className={`nav-link ${isActive(history, '/signin') && 'active'}`} to='/signin'>
                                    Sign In
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className={`nav-link ${isActive(history, '/dashboard') && 'active'}`} to='/dashboard'>
                                    Dashboard
                                </Link>
                            </li>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <span className='nav-link' style={{cursor: 'pointer'}} onClick={() => signout(() => {history.push('/');})}>
                                    Sign Out
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    </div>
);

export default withRouter(Navbar);



/*
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
                            <Link className={`nav-link ${isActive(history, '/') && 'active'}`} to='/'>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className={`nav-link ${isActive(history, '/properties') && 'active'}`} to='/properties'>
                                Properties
                            </Link>
                        </li>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className={`nav-link ${isActive(history, '/contact') && 'active'}`} to='/contact'>
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
                                <Link className={`nav-link ${isActive(history, '/signup') && 'active'}`} to='/signup'>
                                    Sign Up
                                </Link>
                            </li>
                            <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                <Link className={`nav-link ${isActive(history, '/signin') && 'active'}`} to='/signin'>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                            {isAuth() ? (
                                <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                                    <Link className={`nav-link ${isActive(history, '/dashboard') && 'active'}`} to='/dashboard'>
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
        */