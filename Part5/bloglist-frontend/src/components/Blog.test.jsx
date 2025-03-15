import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'


test('renders content', () => {
  const blog = {
    title: 'Test with react-testing-library',
    author: 'Kristina',
    url: 'google.com',
    likes: 10
  }

  const { container } = render(<Blog blog={blog}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Test with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'Kristina'
  )
  expect(div).not.toHaveTextContent(
    'google.com'
  )
  expect(div).not.toHaveTextContent(
    '10'
  )
  
})

test('clicking the button shows blog details', async () => {
    const user = {username: "kristinatodorova"}
    const blog = {
        title: 'Test with react-testing-library',
        author: 'Kristina',
        url: 'google.com',
        likes: 10,
        user: { username: 'kristinatodorova'}
    }
    
    const mockHandler = vi.fn()
  
    const { container } = render(<Blog blog={blog} toggleVisibility = {mockHandler} user={user}/>)

    const div = container.querySelector('.blog')

    expect(div).not.toHaveTextContent(
        'google.com'
      )
      expect(div).not.toHaveTextContent(
        '10'
      )
  
    const userAction = userEvent.setup()
    const button = screen.getByText('View')
    await userAction.click(button)
  
    expect(div).toHaveTextContent(
        'google.com'
      )
      expect(div).toHaveTextContent(
        '10'
      )
  })

test('clicking the like button twice calls handler two times', async () => {
    const user = {username: "kristinatodorova"}
    const blog = {
        title: 'Test with react-testing-library',
        author: 'Kristina',
        url: 'google.com',
        likes: 10,
        user: { username: 'kristinatodorova'}
    }
    
    const mockHandler = vi.fn()
  
    render(<Blog blog={blog} updateBlog = {mockHandler} user={user}/>)
  
    const userAction = userEvent.setup()
    const buttonForView = screen.getByText('View')
    await userAction.click(buttonForView)

const buttonForLike = screen.getByText('Like')
  await userAction.click(buttonForLike)
  await userAction.click(buttonForLike)
  expect(mockHandler.mock.calls).toHaveLength(2)

  })

test('Creating a blog passes correct details to the event handler', async () => {
    
    const mockHandler = vi.fn()
    const user = userEvent.setup()
  
    render(<CreateBlog addBlog={mockHandler}/>)

    const BlogTitle = screen.getByPlaceholderText('title')
    const BlogAuthor = screen.getByPlaceholderText('author')
    const BlogUrl = screen.getByPlaceholderText('url')
    const submitButton = screen.getByText('create')
  
  await user.type(BlogTitle, 'Test Title')
  await user.type(BlogAuthor, 'Test Author')
  await user.type(BlogUrl, 'www.testurl.com')

  await user.click(submitButton)
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com'
  })

  })