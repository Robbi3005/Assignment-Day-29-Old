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

//---------------------------------------------------------------------------

app.put('/store/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('new-data.json'));

    for (let i = 0; i < data.length; i++) {
        
        if (data[i].id == req.params.id) {
            data[i] = req.body;
            // ini buat nmaba file baru di vscode
            fs.writeFileSync('new-data.json', JSON.stringify(data, null, 2))
            break;
        }
    }
    res.status(200).json(req.body)
})

//---------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})