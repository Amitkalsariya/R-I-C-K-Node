const express = require('express')
const app = express()
const fs = require('fs')
app.set('view engine', 'ejs')
let list = []
const data = fs.readFileSync('data.json', 'utf-8')
if (data != '') {
    list = JSON.parse(data)
}
app.get('/', (req, res) => {
    res.render('second')
})
app.get('/myData', (req, res) => {
    const data = req.query
    list.push(data)
    fs.writeFileSync('data.json',JSON.stringify(list))
    res.redirect('/')

})
app.listen(8000)