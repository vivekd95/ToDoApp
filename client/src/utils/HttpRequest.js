const HttpRequest = (url, data, callback = () => { }, method = "GET") => {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (Object.keys(data).length) options['body'] = JSON.stringify(data);
    let basePath = process.env.REACT_APP_API_PATH;
    fetch(basePath + url, options)
        .then(async (data) => {
            const response = await data.json();
            if (response.success) {
                callback(response);
            } else {
                alert(response.message);
            }
        }).catch((err) => {
            alert(err.message);
        });
}

export default HttpRequest;