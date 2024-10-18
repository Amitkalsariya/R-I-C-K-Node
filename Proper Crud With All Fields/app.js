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
        res.render('form',{result,EditResult:null})
       
    })
})
app.post('/createData', (req, res) => {

    const list = req.body
    let id=req.body.id
    if(id)
    {
        var qry=`UPDATE tblfeild SET name='${list.name}',email='${list.email}',password='${list.password}',gender='${list.gender}',hobby='${list.hobbies}',city='${list.city}' WHERE id='${list.id}'`
        con.query(qry,(error)=>{
            if(error) throw error
            console.log("Updated");
            
        })
        res.redirect('/')
    }
    else{

        var qry = `INSERT INTO tblfeild (name,email,password,gender,hobby,city) VALUES ('${list.name}','${list.email}','${list.password}','${list.gender}','${list.hobbies}','${list.city}')`
        con.query(qry, (error) => {
            if (error) throw error
            console.log("Inserted");
    
        })
        res.redirect('/')
    }
})
app.get('/deleteData',(req,res)=>{
    const dId=req.query.delete
    const qry=`DELETE FROM tblfeild WHERE id='${dId}' `
    con.query(qry,(error)=>{
        if(error) throw  error
        console.log("Deleted");
        
    })
    res.redirect('/')
})
app.get('/editData',(req,res)=>{
    const eId=req.query.edit
    var qry=`SELECT  * FROM tblfeild WHERE id='${eId}'`
    con.query(qry,(error,EditResult)=>{
        if(error) throw error
        console.log("Edit Result",EditResult);     
        var qry1=`SELECT * FROM tblfeild `
        con.query(qry1,(error,result)=>{
            if(error) throw error 
            res.render('form',{EditResult:EditResult[0],result})
        })
    })
})
app.listen(1204, () => {
    console.log("You Are on 1204 Port");
})