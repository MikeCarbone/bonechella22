const POSTrequest = async ({ endpoint, params, headers }) => {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        withCredentials: true,
        credentials: 'include',
        mode: 'cors'
    })
    .then(async response => {
        if (!response.ok) { throw await response.json() }
        return await response.json()  //we only get here if there is no error
    })
    .then( json => json)
    .catch( err => {
        return Promise.reject(err);
    });
};

export default POSTrequest
