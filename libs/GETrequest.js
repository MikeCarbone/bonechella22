const GETrequest = async ({ endpoint, headers, throwResOnError }) => {
    return await fetch(endpoint, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        mode: 'cors'
    })
    .then(async response => {
        if (!response.ok) {
            if (throwResOnError) { throw response }
            throw await response.json()
        }
        return await response.json()
    })
    .catch( err => {
        return Promise.reject(err)
    });
};

export default GETrequest;
