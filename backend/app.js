const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectdb = require('./db/db')
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');    

connectdb();
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user' , userRoutes);
app.use("/project" , projectRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the AI Agent Backend!');
});

module.exports = app;