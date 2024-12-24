const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017';
const Client = new MongoClient(url);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

Client.connect(url)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((error) => {
        console.log(error);
    });

const db = Client.db('Db_testing');
const collection = db.collection('rick');

app.get('/', async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.render('form', { data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/createData', async (req, res) => {
    const { id, name, sname, div } = req.body;
    try {
        if (id) {
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { name, sname, div } }
            );
        } else {
            await collection.insertOne(req.body);
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/deleteData', async (req, res) => {
    const dId = req.query.delete;
    try {
        await collection.deleteOne({ _id: new ObjectId(dId) });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/updateData', async (req, res) => {
    const eId = req.query.edit;
    try {
        const formData = await collection.findOne({ _id: new ObjectId(eId) });
        const data = await collection.find().toArray();
        res.render('form', { data, formData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(1304, () => {
    console.log("Server running on port 1304");
});
