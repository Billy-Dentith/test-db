const app = require('../app')
const db = require('../db/connection');
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data');
const request = require('supertest');
const availableEndpoints = require('../endpoints.json');

afterAll(() => db.end());

beforeEach(() => seed(testData));


describe('/api/healthcheck', () => {
    test('GET 200: Should respond with a 200 ok status code', () => {
        return request(app)
        .get('/api/healthcheck')
        .expect(200)
        .then(({ body : { message }}) => {
            expect(message).toBe('All OK')
        })
    })
})

describe('Invalid Endpoints', () => {
    test('Shold return a 404 error code when passed an invalid endpoint', () => {
        return request(app)
        .get('/api/topicss')
        .expect(404)
        .then(({ body: { message } }) => {
            expect(message).toBe('Endpoint Not Found');
        })
    })
})

describe('/api/topics', () => {
    test('GET 200: Should return an array of all the topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            })
        })
    })
})

describe('/api', () => {
    test('GET 200: Should return a description of all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(availableEndpoints)
        })
    })
})

describe('/api/articles/:article_id', () => {
    test('GET 200: Should return with a single article of the provided id', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body: { article }}) => {
            expect(article.article_id).toBe(1)
            expect(article.title).toBe('Living in the shadow of a great man');
            expect(article.topic).toBe('mitch')
            expect(article.author).toBe('butter_bridge');
            expect(article.body).toBe('I find this existence challenging');
            expect(typeof article.created_at).toBe('string')
            expect(article.votes).toBe(100);
            expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
        })
    })
    test('GET 404: Should return an appropriate status and error message if given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/9999')
        .expect(404)
        .then(({ body : { message }}) => {
            expect(message).toBe('Article does not exist')
        })
    })
    test('GET 400: Should return an appropriate status and error message if given an invalid id', () => {
        return request(app)
        .get('/api/articles/invalid_id')
        .expect(400)
        .then(({ body : { message }}) => {
            expect(message).toBe('Bad Request')
        })
    })
})

describe('/api/articles', () => {
    test('GET 200: Should return an array of all the articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles }}) => {
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(article).toHaveProperty('author')
                expect(article).toHaveProperty('title')
                expect(article).toHaveProperty('article_id')
                expect(article).toHaveProperty('topic')
                expect(article).toHaveProperty('created_at')
                expect(article).toHaveProperty('votes')
                expect(article).toHaveProperty('article_img_url')
                expect(article).toHaveProperty('comment_count')
            })
        })
    })
    test('GET 200: Should return the array sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles }}) => {
            expect(articles).toBeSortedBy('created_at', { 
                descending: true
            })
        })
    })
    test('GET 404: Should return an appropriate status and error message when passed an invalid endpoint', () => {
        return request(app)
        .get('/api/articels')
        .expect(404)
        .then(({ body: { message }}) => {
            expect(message).toBe('Endpoint Not Found')
        })
    })
})