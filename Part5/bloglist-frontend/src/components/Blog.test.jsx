import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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