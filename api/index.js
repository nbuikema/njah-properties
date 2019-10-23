const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('database connected');
});
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

app.use('/api/auth', authRoutes);

app.listen(3001, () => {
    console.log('server started on port 3000');
});