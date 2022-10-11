const express = require('express');
const { readFile } = require('fs/promises');

const app = express();

app.listen(process.env.PORT || 3000);
// _____________________________________
app.get('/', async (req, res) => {
    res.status(200).send('AlertBot@2022');
})

app.get('/group', async (req, res) => {
    // require('./group.js')();
    res.send('Ok');
})

app.get('/groupIds', async (req, res) => {
    let file = await readFile('./info.json', 'utf-8');
    file = await JSON.parse(file);
    console.log(file);
    res.json(file);
})