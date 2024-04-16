const express = require('express');
const { getHealthCheck, getEndpoints } = require('./controllers/app.controllers');
const { getAllTopics } = require('./controllers/topics.controllers');
const { getArticleById, getAllArticles, patchArticleById } = require('./controllers/articles.controllers');
const { getCommentsByArticleId, postComment, deleteCommentById } = require('./controllers/comments.controllers');
const { getUsers } = require('./controllers/users.controllers');
const app = express();

app.use(express.json());

// Endpoint Requests
app.get('/api/healthcheck', getHealthCheck);

app.get('/api/topics', getAllTopics);

app.get('/api', getEndpoints);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', postComment);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.get('/api/users', getUsers);

// Requests to Invalid Endpoints 
app.all('*', (req, res, next) => {
    res.status(404).send({ message: 'Endpoint Not Found'})
})

// Error Handling
app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message})
    }
    next(err)
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ message: 'Bad Request'})
    }
    next(err)
})

app.use((err, req, res, next) => {
    if (err.code === '23502') {
        res.status(400).send({ message: 'Bad Request'})
    }
})


module.exports = app;