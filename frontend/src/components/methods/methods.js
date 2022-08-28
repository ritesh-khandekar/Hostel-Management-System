const API_URL = "http://localhost:4000/"
async function postData(url,formdata){
    const data = {}
    for (const [name, value] of formdata) {
      data[name] = value;
    }

    await fetch(API_URL+url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(data => data.json())
    .then(data => {
        return data;
    })
}

async function getData(url){
    return fetch(API_URL+url,{
        method: 'GET',
    }).then(data => data.json())
    
}
export {
    postData,
    getData
}