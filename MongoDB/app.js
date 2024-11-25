const bodyParser = require('body-parser')
const express = require('express')
const { Long } = require('mongodb')
const app = express()
const url = 'mongodb://localhost:27017'
app.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient
const ObjectId=require('mongodb').ObjectId
const Client = new MongoClient(url)
Client.connect(url)
    .then(() => {
        console.log("Connected To Server");

    })
    .catch((error) => {
        console.log(error);

    })
app.set('view engine', 'ejs')
const db=Client.db('Db_testing')
const collection=db.collection('rick')
app.get('/', async(req, res) => {
    const data= await collection.find().toArray()
    res.render('form',{data})
})
app.post('/createData', async (req, res) => {
    const {id,name,sname,div}=req.body
    if(id)
        
    {
        
        await collection.updateOne(
        { _id: new ObjectId(id) },
        {$set:{name,sname,div} }
        )
    }
    else
    {

        await collection.insertOne(req.body)
    }
     res.redirect('/')
})
app.get('/deleteData',async (req,res)=>{
    const dId=req.query.delete
    await collection.deleteOne({_id: new ObjectId(dId)})    
    res.redirect('/')
})
app.get('/updateData', async(req,res)=>{
     const eId=req.query.edit 
     const formData = await collection.findOne({_id: new ObjectId(eId)})
     const data=await collection.find().toArray()
     res.render('form',{data,formData})
})
app.listen(1304, () => {
    console.log("You Are on 1304");
                                                           
})