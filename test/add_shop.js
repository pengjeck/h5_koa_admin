const crypto = require('crypto');
const axiso = require('axios');


function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

axiso.post('https://serious-playing.com.cn:3000/api/1.0/user/login', {
    name: 'admin',
    passwd_hash: cryptPwd('admin123')
}).then((response) => {
    let token = response.data.data.token;
    axiso({
        method: 'post',
        url: 'https://serious-playing.com.cn:3000/api/1.0/shop/add',
        headers: {
            authorization: token
        },
        data: {
            name: Math.random().toString(36).substr(2),
            url: 'url',
            logo_url: 'logo_url',
            loan_range: [1, 100],
            tags: ['分期1个月、3个月、12个月，加长版，防止你乱来'],
            feature: 'feature',
            describe: 'describe',
            user_n: 12,
            weight: 1,
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log('error: ' + err.message);
    });
}).catch((err) => {
    console.log('error: ' + err.message);
})
