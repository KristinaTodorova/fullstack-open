import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log("blog ID:", id)
  console.log("blog object:", newBlog)

  if (!id || typeof id !== "string") {
    console.error("Invalid ID being sent:", id)
    throw new Error("Invalid blog ID")
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

export default { getAll, create, setToken, like }