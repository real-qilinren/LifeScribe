import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('POST /auth/register', function() {
    it('should register a new user', function(done) {
        const newUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            picturePath: 'test.png',
            friends: [],
            location: 'New York',
            occupation: 'Developer'
        };

        request(app)
            .post('/auth/register')
            .field('firstName', newUser.firstName)
            .field('lastName', newUser.lastName)
            .field('email', newUser.email)
            .field('password', newUser.password)
            .field('location', newUser.location)
            .field('occupation', newUser.occupation)
            // .attach('picture', '../test/test.png')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('email', newUser.email);
                done();
            });
    });
});
