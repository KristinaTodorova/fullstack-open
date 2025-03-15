import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, updateBlogs, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

/*   const handleLike = async () => {
    try{
      const updatedBlog = {
        ...blog
      }

      const returnedBlog = await blogService.like(blog.id, updatedBlog)
      updateBlog(returnedBlog)
    }
    catch(exception) {
      console.log(exception)
    }
  }
 */
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1 
    }
    updateBlog(updatedBlog) 
  }

  const handleDelete = async () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try{
        //console.log(user.username, blog.user.username)
        await blogService.remove(blog.id)
        updateBlogs()
      }
      catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      <br></br>
      {blog.author}
      <br></br>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
          <p>{blog.user?.name}</p>
          {blog.user?.username === user.username && (
            <button onClick={handleDelete}>remove</button>
          )
          }
        </div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
    </div>
  )
}

export default Blog