const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected');
});

app.get('/', (req, res) => {
    res.send('init');
});

app.listen(3001, () => {
    console.log('server started on port 3000');
});