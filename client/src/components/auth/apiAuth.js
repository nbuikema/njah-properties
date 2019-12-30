const jwtDecode = require('jwt-decode');
const API = process.env.REACT_APP_API_URL;

export const signup = (token, user) => {
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const signin = user => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuth = () => {
    if(typeof window === 'undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        const token = localStorage.getItem('jwt');
        const {exp} = jwtDecode(token);
        const curTime = Date.now() / 1000;
        if(exp >= curTime) {
            return JSON.parse(token);
        } else {
            signout(() => {});
            return false;
        }
    } else {
        return false;
    }
};

export const signout = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {
            method: 'GET'
        }).then().catch(err => {
            console.log(err)
        });
    }
};

export const forgotPassword = (email) => {
    return fetch(`${API}/auth/password/forgot`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};