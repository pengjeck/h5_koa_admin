var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

module.exports = cryptPwd;