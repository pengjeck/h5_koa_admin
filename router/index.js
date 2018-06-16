const router = require('koa-router')();
const userctrl = require('../controllers/users')
const shopctrl = require('../controllers/shops');


router
    .get('/api/1.0/all_shops', shopctrl.findAllShops);


module.exports = router;