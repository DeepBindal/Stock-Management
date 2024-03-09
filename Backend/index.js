const express = require('express')
const app = express()
const port = 5000;
const mongoose = require('mongoose');
const Stock = require('./Models/stock.js');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(cors({
    origin: '*', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, HTTP authentication) across domains
  }))
main().then(res => console.log("db connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StockManagement');
}

app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api", async (req, res) => {
    let allStocks = await Stock.find({});
    res.send(allStocks);
})

app.post("/api", async (req, res) => {
    let data = req.body;
    let stock = new Stock(data);
    let savedStock = await stock.save();
    res.send({message : "Stock added"});
})

app.get("/api/search", async (req, res) => {
    try{
    let query = req.query.q
    const results = await Stock.find({
        $or: [
          { slug: { $regex: new RegExp(query, 'i') } },
        ],
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.put("/api/action", async(req, res) => {
    let body = req.body;
    let options = {
        returnDocument: "after"
    };

    if(body.action === "minus"){
        let updatedListing = await Stock.findOneAndUpdate({slug: body.slug}, { $inc: { quantity: -1 } }, options);
        res.send({message: "Updated successfully"});
    }else{
        let updatedListing = await Stock.findOneAndUpdate({slug: body.slug}, { $inc: { quantity: +1 } }, options);   
        res.send({message: "Updated successfully"});
    }
})

app.delete("/api/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Stock.findByIdAndDelete(id);

    console.log(deletedListing);
    res.send({message : "deleted Successfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})