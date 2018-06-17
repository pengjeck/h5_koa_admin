const crypto = require('crypto');
const axiso = require('axios');



axiso.get('http://localhost:3000/api/1.0/shop/findAll')
    .then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log('error: ' + error);
    })
