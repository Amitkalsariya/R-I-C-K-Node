const express=require('express')
const { Long } = require('mongodb')
const app=express()
const url='mongodb://localhost:27017'
const MongoClient=require('mongodb').MongoClient
const Client= new MongoClient(url)
Client.connect(url)
.then(()=>{
    console.log("Connected To Server");
    
})
.catch((error)=>{
    console.log(error);
    
})
app.listen(1304,()=>{
    console.log("You Are on 1304");
    
})