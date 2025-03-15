import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test with react-testing-library',
    author: 'Kristina',
    url: 'google.com',
    likes: 10
  }

  const { container } = render(<Blog blog={blog} />)

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