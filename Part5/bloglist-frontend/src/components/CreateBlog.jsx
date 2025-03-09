const CreateBlog = ({
    createBlog,
    title,
    handleTitle,
    author,
    handleAuthor,
    url,
    handleUrl
}) => (
    <div>

      <h2>Create new blog</h2>
    <form onSubmit={createBlog}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>

        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>

        <div>
          url
            <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrl}
          />
        </div>
        
        <button type="submit">create</button>
      </form>
    </div>
  )

export default CreateBlog