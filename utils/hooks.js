const mongoose = require('mongoose');
mongoose.connection.on('error', function(err) {
    console.log(err);
})
