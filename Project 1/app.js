const express=require('express')
const fs =require('fs')
const app=express()
let list=[]
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index',{list})
})
app.listen(1910)