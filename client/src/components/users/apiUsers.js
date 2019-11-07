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

export const createProperty = (token, property) => {
    return fetch(`${API}/property/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: property
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const readAllMessages = token => {
    return fetch(`${API}/contact/read/all`, {
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

export const readMyMessages = token => {
    return fetch(`${API}/contact/read/current`, {
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

export const readMessagesWithQuery = query => {
    return fetch(`${API}/contact/read/query?${query}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const createForm = (token, data) => {
    return fetch(`${API}/form/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: data
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const deleteForm = (token, form) => {
    return fetch(`${API}/form/delete/${form._id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    });
};

export const deleteProperty = (token, property) => {
    return fetch(`${API}/property/delete/${property._id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(property)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    });
};