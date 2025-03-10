const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  const user = request.user

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user

  const blog = await Blog.findById(request.params.id).populate('user');

  if (blog.user.id.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'Only the creator of this blog can delete it' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {

  const currentBlog = await Blog.findById(request.params.id)
  const blog = {
    title: currentBlog.title,
    author: currentBlog.author,
    url: currentBlog.url,
    likes: currentBlog.likes+1
  }

  const updatedBlog = await (Blog.findByIdAndUpdate(request.params.id, blog, { new: true }))
  response.json(updatedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await (Blog.findById(request.params.id))
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

module.exports = blogsRouter