import React, {useState} from 'react';

const Signup = () => {
    const signupForm = () => (
        <form>
            <div className='row'>
                <div className="col form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" className="form-control" id="first_name" placeholder="John" />
                </div>
                <div className="col form-group">
                    <label for="last_name">Last Name</label>
                    <input type="text" className="form-control" id="last_name" placeholder="Doe" />
                </div>
            </div>
            <div className="form-group">
                <label for="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="john@doe.com" />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" placeholder="********" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <div className='container'>
            <h1>Sign Up</h1>
            {signupForm()}
        </div>
    );
};

export default Signup;