const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('when creating a user', () => {
  test('returns 400 if username is too short', async () => {
    const newUser = {
      username: 'a',
      name: 'TestUser',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const errorMessage = response.body.error
    assert(errorMessage.includes('User validation failed: username'))
    assert(errorMessage.includes('shorter than the minimum allowed length'))
  })

  test('returns 400 if password is too short', async () => {
    const newUser = {
      username: 'testuser',
      name: 'TestUser',
      password: 'p'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const errorMessage = response.body.error
    assert.strictEqual(errorMessage, 'password must be at least 3 characters')
  })
})

after(async () => {
  await mongoose.connection.close()
})