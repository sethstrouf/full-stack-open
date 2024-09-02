import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([''])
  const [author, setAuthor] = useState([''])
  const [url, setUrl] = useState([''])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationType('success')
      setNotification(`${username} logged in successfully`)
    } catch (e) {
      console.error(e.response.data.error)
      setNotificationType('error')
      setNotification(e.response.data.error)
    } finally {
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappuser')
  }

  const addBlog = async e => {
    e.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationType('success')
      setNotification(`${returnedBlog.title} by ${returnedBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.error(e)
      setNotificationType('error')
      setNotification(`Unable to create new blog`)
    } finally {
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      Author
      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <br />
      URL
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <br />
      <button type="submit">Create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={notification} type={notificationType} />

        <form onSubmit={handleLogin}>
          <div>
            Username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
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
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification} type={notificationType} />

      <div>
        {user.username} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />

      <h2>Create New</h2>
      {blogForm()}
      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App