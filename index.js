require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3000

const fs = require('fs');

let bodyParser = require('body-parser');

app.use(bodyParser.json());

//---------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.send('Hello, This is Store Data')
});

//---------------------------------------------------------------------------

app.get('/store', (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('store.json')));
})

//----------------------------------------------------------------------------

app.post('/store', (req, res) => {
    console.log(req.body);

    const data = JSON.parse(fs.readFileSync('store.json'));

    data.push(req.body);
    
    fs.writeFileSync('new-data.json', JSON.stringify(data, null, 2));

    res.status(201).json(req.body)
})

//----------------------------------------------------------------------------

app.get('/store-new', (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('new-data.json')));
})

//----------------------------------------------------------------------------

app.get('/store-new/:id', (req, res) => {
    
    const id = req.params.id

    const data = JSON.parse(fs.readFileSync('new-data.json'));

    let foundData = null // ga boleh pake const

    for (let i = 0; i < data.length; i++) {

        if (data[i].id == id) {
            foundData = data[i];
            break;
        }
    }

    res.status(200).json(foundData);
})

//----------------------------------------------------------------------------

app.get('/store-new-delete', (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('new-data-delete.json')));
})

//---------------------------------------------------------------------------

app.put('/store/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('new-data.json'));

    for (let i = 0; i < data.length; i++) {

        if (data[i].id == req.params.id) {
            data[i] = req.body;

            fs.writeFileSync('new-data.json', JSON.stringify(data, null, 2))
            break;
        }
    }
    res.status(200).json(req.body)
})

//---------------------------------------------------------------------------

app.delete('/store-delete/:id', function (req, res) {
    // find item from array of data

    const data = JSON.parse(fs.readFileSync('new-data.json'));

    for (let i = 0; i < data.length; i++) {

        if (data[i].id == req.params.id) {
            // data.splice(data[i].id)
            data.splice(i, 1)

            fs.writeFileSync('new-data-delete.json', JSON.stringify(data, null, 2))
            break;
        }
    }
    res.sendStatus(204);
});

//---------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})