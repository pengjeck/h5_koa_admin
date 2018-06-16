const config = require('../config/common')
const mongoose = require('mongoose')
const Shop = require('../models/shop')

class ShopController {
    static async findAllShops(ctx, next) {
        var query = Shop.find();
        query.exec(function (err, docs) {
            if (err) {
                console.log('err');
            } else {
                console.log('docs');
                console.log(docs);
            }
        });
    }
    static async deleteShop(ctx, next) {
        
    }
    static async addShop(ctx, next) {
    
    }
    static async modifyShop(ctx, next) {

    }
}

module.exports = ShopController;
