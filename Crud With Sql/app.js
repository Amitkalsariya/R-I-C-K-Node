const bodyParser = require('body-parser')
const express=require('express')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
const mysql=require('mysql')
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_with_mysql'
})
con.connect((error)=>{
    if(error) throw error
    console.log("Connected");
    
})
app.set('view engine' , 'ejs')
app.get('/',(req,res)=>{
    res.render('form')
})
app.post('/addData',(req,res)=>{
    const list = req.body
    const qry=`INSERT INTO tblentry (uid,password) VALUES('${list.uid}','${list.pwd}')`  
    con.query(qry,(error)=>{
        if(error) throw error
        console.log("Record Inserted");
        
    })
    res.redirect('/')
})
app.listen(1311)