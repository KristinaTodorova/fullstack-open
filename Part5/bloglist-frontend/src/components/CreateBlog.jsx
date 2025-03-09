import { useState } from 'react';

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
        const newBlog = {title, author, url}
        await addBlog(newBlog)

      setTitle('')
      setAuthor('')
      setUrl('')

      toggleVisibility() 

    } catch (exception) {
        setErrorMessage("Failed")
    }
  }

return (
    <div>

      <h2>Create new blog</h2>
    <form onSubmit={createBlog}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url
            <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default CreateBlog