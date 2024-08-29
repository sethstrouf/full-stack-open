const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const createUser = async () => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('password', saltRounds)

  const user = new User({
    username: 'testUser',
    name: 'Test User',
    passwordHash
  })

  return await user.save()
}

const getUserToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifer of a blog is called id', async () => {
  const response = await api.get('/api/blogs')
  const blogKeys = Object.keys(response.body[0])

  assert.strictEqual(blogKeys.includes('id'), true)
})

test('a valid blog can be added', async () => {
  const user = await createUser()
  const token = getUserToken(user)

  const newBlog = {
    title: 'Newest Blog',
    author: 'New Author',
    url: 'http://example.com',
    likes: 23,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Newest Blog'))
})

test('likes property defaults to 0', async () => {
  const user = await createUser()
  const token = getUserToken(user)

  const newBlog = {
    title: 'Newest Blog',
    author: 'New Author',
    url: 'http://example.com'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(savedBlog.body.likes, 0)
})

test('returns 400 if title is missing', async () => {
  const user = await createUser()
  const token = getUserToken(user)

  const newBlog = {
    author: 'New Author',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400)
})

test('returns 400 if url is missing', async () => {
  const user = await createUser()
  const token = getUserToken(user)

  const newBlog = {
    title: 'Newest Blog',
    author: 'New Author'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400)
})

test('returns 401 if no token provided', async () => {
  const newBlog = {
    title: 'Newest Blog',
    author: 'New Author',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogs = await Blog.find({})
    const blogsAtStart = blogs.map(blog => blog.toJSON())
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 10,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogAfterUpdate = await Blog.findById(blogToUpdate.id)
    assert(blogAfterUpdate.likes, blogToUpdate + 10)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await createUser()
    const token = getUserToken(user)

    const newBlog = new Blog({
      title: 'Newest Blog',
      author: 'New Author',
      url: 'http://example.com',
      user: user.id
    })

    const blogToDelete = await newBlog.save()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await Blog.find({})

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})