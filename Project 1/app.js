const express=require('express')
const fs =require('fs')
const app=express()
let list=[]

const data=fs.readFileSync('data.json','utf-8')
if(data != '')
{
    list=JSON.parse(data)
}
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index',{list,showData:null})
})
app.get('/showData',(req,res)=>{
    const eId=req.query.show
    let showData=list[eId]
    res.render('product',{showData,list})
})
app.listen(1910)