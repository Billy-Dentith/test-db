const express = require('express');
const { getAllTopics, getHealthCheck } = require('./controllers/controllers');
const app = express();

app.use(express.json());

// Endpoint Requests
app.get('/api/healthcheck', getHealthCheck);

app.get('/api/topics', getAllTopics);

// Requests to Invalid Endpoints 
app.all('*', (req, res, next) => {
    res.status(404).send({ message: 'Endpoint Not Found'})
})

// Error Handling


module.exports = app;