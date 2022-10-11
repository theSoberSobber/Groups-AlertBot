const express = require('express');
const path = require('path');
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
    res.sendFile(path.join(__dirname, 'info.txt'));
})