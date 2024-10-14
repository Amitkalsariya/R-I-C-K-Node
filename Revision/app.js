const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')
app.set('view engine', 'ejs')
let list = []
let editData = null
let eId = null
app.use(bodyParser.urlencoded({extended:true}))
const data = fs.readFileSync('data.json', 'utf-8')
if (data != '') {
    list = JSON.parse(data)
}
app.get('/', (req, res) => {
    res.render('second', { list, editData })
})
app.post('/myData', (req, res) => {
    const data = req.body

    if (eId != null) {
        list[eId] = data
        editData = null
    }
    else {

        list.push(data)
    }
    fs.writeFileSync('data.json', JSON.stringify(list))
    res.redirect('/')

})
app.get('/deleteData/:delete', (req, res) => {
    const dId = req.params.delete
    list.splice(dId, 1)
    fs.writeFileSync('data.json', JSON.stringify(list))
    res.redirect('/')

})
app.get('/editData', (req, res) => {
    eId = req.query.edit
    editData = list[eId]
    res.render('second', { editData, list })

})
app.listen(8000)


