const express = require('express');
const { getHealthCheck, getEndpoints } = require('./controllers/app.controllers');
const { getAllTopics } = require('./controllers/topics.controllers')
const app = express();

app.use(express.json());

// Endpoint Requests
app.get('/api/healthcheck', getHealthCheck);

app.get('/api/topics', getAllTopics);

app.get('/api', getEndpoints);

// Requests to Invalid Endpoints 
app.all('*', (req, res, next) => {
    res.status(404).send({ message: 'Endpoint Not Found'})
})

// Error Handling


module.exports = app;