const API = process.env.REACT_APP_API_URL;

export const readCurrentUser = token => {
    return fetch(`${API}/user/read/current`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const readAllUsers = token => {
    return fetch(`${API}/user/read/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const updateUser = (token, user) => {
    return fetch(`${API}/user/update/${user._id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    });
};

export const deleteUser = (token, user) => {
    return fetch(`${API}/user/delete/${user._id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    });
};

export const createProperty = property => {
    return fetch(`${API}/property/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: property
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};