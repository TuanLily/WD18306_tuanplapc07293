const axios = require('axios');
const fs = require('fs'); //https://freetuts.net/module-fs-trong-nodejs-674.html

// *Bài 1
let promise = new Promise((resolve, reject) => {
    resolve(1);

    setTimeout(() => resolve(2), 3000);
});

promise.then(alert => {
    console.log(alert);
})


//* bài 2.1
const fetchUrls = async (urls) => {
    const results = [];
    for (const url of urls) {
        const res = await axios.get(url);
        results.push(res);
    }
    return results;
}

// fetchUrls();

//* bài 2.2

const fetchUrlsParalle = async (urls) => {
    const results = await Promise.all(
        urls.map((url => {
            return axios.get(url);
        }))
    );
    return results;
}

// fetchUrlsParalle()


//* Bài 3

fs.readFile('/db.json', { encoding: 'utf8' }, function (err, data) {
    console.log(">>> Data loaded from disk ", data);

    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => {
            console.log(">>> Data export form url ", res.data);
        });
});