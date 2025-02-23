const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const Blog = require('../models/blog')

const api = supertest(app)


/* const initialBlogs = [
    {
        title: "How to add async await to an app without f-in it up",
        author: "Me",
        url: "google.com",
        likes: "1"
    },
    {
        title: "How to add supertest an app without f-in it up",
        author: "Kristina Todorova",
        url: "google.com",
        likes: "10"
    },
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}) */

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 13 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 13)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert.strictEqual("id" in blog, true)
        assert.strictEqual("_id" in blog, false)
    })
})

test('post request successful and count increases by one', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialLength = initialResponse.body.length

    const newBlog = {
        title: 'Exercise 4.10 will be successful',
        author: 'Kristina Obviously',
        url: 'www.google.com',
        likes: 10
      }
      await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

      const response = await api.get('/api/blogs')
      const updatedLength = response.body.length

    assert.strictEqual(updatedLength, initialLength + 1)
})

test('if there are no likes, the default value is 0', async () => {
    const newBlog = {
        title: 'Exercise 4.11 will be successful',
        author: 'Meee Obviously',
        url: 'www.google.com'
      }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

      const response = await api.get('/api/blogs')
      savedBlog = response.body[response.body.length-1]
      console.log('Blog:', savedBlog);
      assert.strictEqual(savedBlog.likes, 0)
})

test('post without title returns 400 and nothing is created', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialLength = initialResponse.body.length

    const newBlog = {
        author: 'Kristina Obviously',
        url: 'www.google.com',
        likes: 10
      }
      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const response = await api.get('/api/blogs')
      const updatedLength = response.body.length

    assert.strictEqual(updatedLength, initialLength)
})

test('post without url returns 400 and nothing is created', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialLength = initialResponse.body.length

    const newBlog = {
        title: 'Amazing blog post but without url',
        author: 'Kristina Todorova',
        likes: 10
      }
      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const response = await api.get('/api/blogs')
      const updatedLength = response.body.length

    assert.strictEqual(updatedLength, initialLength)
})

test('count decreases when blog is deleted', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialLength = initialResponse.body.length

      await api.delete(`/api/blogs/${initialResponse.body[5].id}`)
      .expect(204)

      const response = await api.get('/api/blogs')
      const updatedLength = response.body.length

    assert.strictEqual(updatedLength, initialLength - 1)
})

test('likes increase when blog is updated', async () => {
    const initialResponse = await api.get('/api/blogs')
    const blogId = initialResponse.body[5].id

    const newBlog = {
        title: 'How to be a marketing rockstar',
        author: 'Koko',
        url: 'amazingmarketing.com',
        likes: 2828
      }
      await api.put(`/api/blogs/${blogId}`)
      .send(newBlog)
      .expect(200)

      const response = await api.get('/api/blogs')
      const updatedBlog = response.body.find(blog => blog.id === blogId);
      const updatedLikes = updatedBlog.likes

    assert.strictEqual(updatedLikes, 2828)
})

test.only('user does not get created if username too short and an error message is shown', async () => {
  const initialResponse = await api.get('/api/users')
  const initialLength = initialResponse.body.length

  const newUser = {
    username: 'kp',
    name: 'Koko',
    password: '1234567'
  }

  await api.post('/api/users')
      .send(newUser)
      .expect(400)

  const response = await api.get('/api/users')
  const updatedLength = response.body.length

  assert.strictEqual(updatedLength, initialLength)
})

test.only('user does not get created if password too short and an error message is shown', async () => {
  const initialResponse = await api.get('/api/users')
  const initialLength = initialResponse.body.length

  const newUser = {
    username: 'konstantinpimpirev',
    name: 'Koko',
    password: 'kp'
  }

  await api.post('/api/users')
      .send(newUser)
      .expect(400)

  const response = await api.get('/api/users')
  const updatedLength = response.body.length

  assert.strictEqual(updatedLength, initialLength)
})

after(async () => {
  await mongoose.connection.close()
})