const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));


// prefix all APIs with /api
app.use('/api', routes);
app.use('/api/task', routes);


// generic 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));


module.exports = app;