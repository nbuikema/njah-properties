const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected');
});
app.use(bodyParser.json());

app.use('/api', authRoutes);

app.listen(3001, () => {
    console.log('server started on port 3000');
});