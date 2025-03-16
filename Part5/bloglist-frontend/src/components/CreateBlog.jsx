import { useState } from 'react'

const CreateBlog = ({
  addBlog,
  toggleVisibility
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = { title, author, url }
      await addBlog(newBlog)

      setTitle('')
      setAuthor('')
      setUrl('')

      toggleVisibility()

    } catch (exception) {
      console.error('failed')
    }
  }

  return (
    <div>

      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            data-testid='title'
            type="text"
            value={title}
            name="Title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author
          <input
            data-testid='author'
            type="text"
            value={author}
            name="Author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url
          <input
            data-testid='url'
            type="text"
            value={url}
            name="URL"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default CreateBlog