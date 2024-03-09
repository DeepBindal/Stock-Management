const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    slug : {
        type : String,
    },
    price : {
        type : Number,
    },
    quantity : {
        type : Number,
    },
})

const Stock = new mongoose.model('Stock', Schema);

module.exports = Stock;