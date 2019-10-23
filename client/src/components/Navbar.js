import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, isAdmin, signout} from './auth/apiAuth';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {borderBottom: '2px solid #FFFFFF'};
    }
}

const Navbar = ({history}) => (
    <div className='sticky-top'>
        {console.log(isAuth())}
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <ul className='navbar-nav mr-auto mt-lg-0'>
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
                            <Link className='nav-link' to='/properties' style={isActive(history, '/products')}>
                                Properties
                            </Link>
                        </li>
                        <li className='nav-item' data-toggle='collapse' data-target='.navbar-collapse.show'>
                            <Link className='nav-link' to='/secret' style={isActive(history, '/secret')}>
                                Secret
                            </Link>
                        </li>
                    </ul>
                    <div className='dropdown-divider'></div>
                    {isAuth() === false ? (
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