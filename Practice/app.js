const bodyParser = require('body-parser')
const express=require('express')
const app= express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
const MongoClient=require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const Client= new MongoClient(url)
const db=Client.db('Db_testing')
const collection=db.collection('temp')
const ObjectId=require('mongodb').ObjectId
Client.connect(url)
.then(()=>{
    console.log("Success");
    
})
.catch(()=>{
    console.log("Failed");
    
})
app.get('/',async (req,res)=>{
    const data=await collection.find().toArray()
    res.render('form',{data})
})
app.post('/cData',async (req,res)=>{
    await collection.insertOne(req.body)
    res.redirect('/')
})
app.get('/dData',(req,res)=>{
    const dId=req.query.delete
    collection.deleteOne({_id: new ObjectId(dId)})
    res.redirect('/')
})
app.listen(1111)