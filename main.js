const express = require('express');
const path = require('path');
const app = express();

app.listen(process.env.PORT || 3000);
// _____________________________________
app.get('/group', async (req, res) => {
    require('./group.js')();
})

app.get('/groupIds', async (req, res) => {
    res.sendFile(path.join(__dirname, 'info.txt'));
})