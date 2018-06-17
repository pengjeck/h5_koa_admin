const crypto = require('crypto');
const axiso = require('axios');


function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

axiso.post('http://localhost:3000/api/1.0/user/login', {
    name: 'admin',
    passwd_hash: cryptPwd('admin123')
}).then((response) => {
    let token = response.data.data.token;
    axiso({
        method: 'post',
        url: 'http://localhost:3000/api/1.0/shop/delete',
        headers: {
            authorization: token
        },
        data: {
            name: 'futu6ff6h4u',
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log('error: ' + err.message);
    });
}).catch((err) => {
    console.log('error: ' + err.message);
})
