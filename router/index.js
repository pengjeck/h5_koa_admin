const router = require('koa-router')();
const userctrl = require('../controllers/users')
const shopctrl = require('../controllers/shops');

router
    .get('/api/1.0/shop/findAll', shopctrl.findAll)  // shop
    .post('/api/1.0/shop/add', shopctrl.add)
    .post('/api/1.0/shop/add', shopctrl.modify)
    .post('/api/1.0/shop/delete', shopctrl.delete)
    .post('/api/1.0/user/register', userctrl.register)   // user
    .post('/api/1.0/user/login', userctrl.login)

module.exports = router;