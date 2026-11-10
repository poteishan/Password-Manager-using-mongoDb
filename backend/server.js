const express = require('express');
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()

// Connection URL
const url = process.env.MONGO_URI ||'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'pass';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all Password
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save Password 
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({success:true})
})

// Delete Password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({success:true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log(process.env.MONGO_URI)