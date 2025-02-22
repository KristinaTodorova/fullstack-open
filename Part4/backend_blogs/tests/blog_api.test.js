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

test.only('if there are no likes, the default value is 0', async () => {
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

after(async () => {
  await mongoose.connection.close()
})