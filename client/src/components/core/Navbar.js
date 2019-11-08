import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/apiAuth';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return true;
    }
}

const Navbar = ({history}) => (
    <div className='sticky-top shadow-sm'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container-fluid'>
                <div className='navbar-brand abs'>
                    <Link className='brand-fix' to='/'>
                        NJAH Properties
                    </Link>
                </div>
                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
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
            </div>
        </nav>
    </div>
);

export default withRouter(Navbar);