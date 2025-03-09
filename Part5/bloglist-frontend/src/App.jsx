import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import './index.css' 
import Toggable from './components/Toggable'
import CreateBlog from './components/CreateBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [notification, setNewNotification] = useState('')
  const [error, setNewError] = useState('')
  const blogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewError(`Wrong username or password`)
        setTimeout(() => {
              setNewError('')
            }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);

      setBlogs(prevBlogs => [...prevBlogs, newBlog]); 

      setNewNotification(`A new blog "${newBlog.title}" by ${newBlog.author} has been added!`);
      setTimeout(() => setNewNotification(''), 5000);
    } catch (exception) {
      setNewError(`Adding a new blog failed.`)
        setTimeout(() => {
              setNewError('')
            }, 5000)
    }
  };

  const loginForm = () => (
    <div>
    <h2>Login</h2>
    { error && <ErrorMessage message={error} />} 
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      </div>
  )

  const blogList = () => (
    <div>
      { error && <ErrorMessage message={error} />} 
      { notification && <Notification message={notification} />}    
      <p>{user.name} is logged in.</p> 
      
      <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
      </form>

      <Toggable buttonLabel="create new blog" ref={blogRef}>

        <CreateBlog 
        addBlog={createBlog}
        toggleVisibility={() => blogRef.current.toggleVisibility()}
        />

      </Toggable>

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>The Best Blog Application</h1>

      {user === null ?
      loginForm() :
      blogList()
    }
    </div>
  )
}

export default App