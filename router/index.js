const router = require('koa-router')();
const userctrl = require('../controllers/users')
const shopctrl = require('../controllers/shops');


router
    .get('/api/1.0/shop/all_shops', shopctrl.findAllShops)
    .post('/api/1.0/user/register', userctrl.register)

module.exports = router;