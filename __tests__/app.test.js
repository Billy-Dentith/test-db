const app = require('../app')
const db = require('../db/connection');
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data');
const request = require('supertest');

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