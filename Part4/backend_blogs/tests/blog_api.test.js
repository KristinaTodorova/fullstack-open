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

test('there are nine blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 9)
  })

after(async () => {
  await mongoose.connection.close()
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert.strictEqual("id" in blog, true)
        assert.strictEqual("_id" in blog, false)
    })
  })

after(async () => {
  await mongoose.connection.close()
})