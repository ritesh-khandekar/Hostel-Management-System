const API_URL = "http://localhost:4000/"
async function postData(url, formdata) {
    var data = {}
    if (typeof formdata["filters"] !== "undefined") {
        data = formdata;
    }
    else if (typeof formdata["complaint_id"] !== "undefined") {
        data = formdata;
    }
    else {
        for (const [name, value] of formdata) {
            data[name] = value;
        }
    }

    return await fetch(API_URL + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(data => data.json())
}

async function getData(url) {
    const data = await fetch(API_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await data.json();

}
export {
    postData,
    getData
}