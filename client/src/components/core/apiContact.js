const API = process.env.REACT_APP_API_URL;

export const sendContact = (data) => {
    return fetch(`${API}/contact/contact`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: data
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};