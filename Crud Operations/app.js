const express = require('express')
const fs = require('fs')
const app = express()
let myData = []
const  data = fs.readFileSync('data.json', 'utf-8')
app.set('view engine', 'ejs')
if (data != "") {
    myData = JSON.parse(data)
}
app.get('/', (req, res) => {
    res.render('index',{myData})
})
app.get('/addData', (req, res) => {
    const data = req.query
    myData.push(data)
    fs.writeFileSync('data.json', JSON.stringify(myData))
    res.redirect('/')
})
app.get('/deleteData',(req,res)=>{
    const dId=req.query.delete
    myData.splice(dId,1)
    fs.writeFileSync('data.json',JSON.stringify(myData))
    res.redirect('/')
})
app.get('/editData',(req,res)=>{
    
})
app.listen(2412)
