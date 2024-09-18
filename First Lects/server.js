const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url == '/') {
        const data=fs.readFileSync('Amit1.txt','utf-8')
        res.write(data)
    }
    else if (req.url == '/home') {
        const data = fs.unlinkSync('Amit.txt')
        res.write(data)
       
    }
    else if (req.url == '/help') {
        const data = fs.appendFileSync('Amit3.txt', 'Heloo Data ...')
        // res.write('This is Helper Page')
    }

    else if (req.url == 'contact') {
       const data=fs.writeFileSync('Amit1.txt','Hello Amit !!!!!')
        res.write(data)
    }

    res.end()
})
server.listen(2000) 
