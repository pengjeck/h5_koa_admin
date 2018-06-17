const crypto = require('crypto');
const axiso = require('axios');


function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

axiso.post('http://localhost:3000/api/1.0/user/register', {
    name: 'admin',
    passwd_hash: cryptPwd('admin123')
}).then((response) => {
    console.log(response.status);
}).catch((error) => {
    console.log('error: ' + error);
})

