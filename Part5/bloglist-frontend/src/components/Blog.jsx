import { useState } from "react";

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const [visible, setVisible] = useState(false);

const toggleVisibility = () => {
  setVisible(!visible);
};

return (
  <div style={blogStyle}>
    {blog.title} 
    <br></br>
    {blog.author}
    <br></br>
    {visible && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button>Like</button></p>
          <p>{blog.user?.name}</p>
        </div>
      )}
    <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
  </div>  
)
}

export default Blog