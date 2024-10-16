const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_with_mysql'
})
con.connect((error) => {
    if (error) throw error
    console.log("Connected");

})
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    var qry = `SELECT * FROM tblentry `
    con.query(qry, (error, result) => {
        if (error) throw error
        res.render('form', { result, editResult: null ,eId})


    })
})
app.post('/addData', (req, res) => {
    const list = req.body
    const eId = req.body.edit

    if(eId)
    {
        const qry=`UPDATE tblentry SET uid='${list.uid}' AND password='${list.password} WHERE id='${eId}''`
        req.query(qry,(error,result)=>{
            if(error) throw error
            console.log("Updated");
            
        })
    }
    else{
        
        const qry = `INSERT INTO tblentry (uid,password) VALUES('${list.uid}','${list.pwd}')`
    
        con.query(qry, (error) => {
            if (error) throw error
            console.log("Record Inserted");
    
        })
    }
    res.redirect('/')
})
app.get('/deleteData', (req, res) => {
    const dId = req.query.delete
    var qry = `DELETE FROM tblentry WHERE id='${dId}' `
    con.query(qry, (error) => {
        if (error) throw error
        console.log("Delete Success");

    })
    res.redirect('/')

})
app.get('/editData', (req, res) => {
    const eId = req.query.edit
    var qry = `SELECT * FROM tblentry WHERE id='${eId}' `
    con.query(qry, (error, editResult) => {
        if (error) throw error
        console.log("Edited",editResult);
        var qry1 = `SELECT * FROM tblentry `
        con.query(qry1, (error, result) => {
            if (error) throw error
            res.render('form', { editResult: editResult[0], result })
        })  

    })
    
})
app.listen(1311)