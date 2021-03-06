const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const contactRoutes = require('./routes/contact');
const formRoutes = require('./routes/form');
const braintreeRoutes = require('./routes/braintree');

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
app.use('/api/user', userRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/form', formRoutes);
app.use('/api/braintree', braintreeRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});