const bodyParser = require('body-parser')
const express=require('express')
const mysql=require('mysql') 
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crud_with_mysql'
    }
)
con.connect((error) => {
    if (error) throw error
    console.log("Connected To Server");

})
app.get('/', (req, res) => {
    var qry = `SELECT * FROM tblfeild `
    con.query(qry, (error, result) => {
        if (error) throw error
        res.render('form',{result})
       
    })
})
app.post('/createData', (req, res) => {
    const list = req.body
    var qry = `INSERT INTO tblfeild (name,email,password,gender,hobby,city) VALUES ('${list.name}','${list.email}','${list.password}','${list.gender}','${list.hobbies}','${list.city}')`
    con.query(qry, (error) => {
        if (error) throw error
        console.log("Inserted");

    })
    res.redirect('/')
})
app.listen(1204, () => {
    console.log("You Are on 1204 Port");
})