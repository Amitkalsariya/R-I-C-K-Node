const express=require('express')
const app=express()
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.send("Amit Kalsariya")
    // res.render('help')
})
app.get('/help',(req,res)=>{
    // res.send('Testing')
    const a=[1,2,3,4,5]
    res.render('help',{a})
})
app.listen(2113)