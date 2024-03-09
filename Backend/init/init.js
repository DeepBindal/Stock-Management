const mongoose = require('mongoose');
const Stock = require('../Models/stock');
const data = require('./data.js');

main().then(res => console.log("db connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StockManagement');
}

async function initDatabase(){
    await Stock.deleteMany({});
    let savedStocks = await Stock.insertMany(data);
    console.log(savedStocks);
}
initDatabase();
