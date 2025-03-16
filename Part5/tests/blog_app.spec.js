const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Test User',
            username: 'testuser',
            password: 'testuser'
          }
        })
    
        await page.goto('http://localhost:5173')
      })

test('front page can be opened', async ({ page }) => {
  const locator = await page.getByText('The Best Blog Application')
  await expect(locator).toBeVisible()
  await expect(page.getByText('The Best Blog Application')).toBeVisible()
})

test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Blog App Login')).toBeVisible()
})

describe('Login', () => {
test('fails with wrong credentials', async ({page}) => {
    await loginWith(page, 'wrongtestuser', 'wrongtestuser')
    await expect(page.getByText('Wrong username or password')).toBeVisible()
})

test('succeeds with correct credentials', async ({page}) => {
    await loginWith(page, 'testuser', 'testuser')
    await expect(page.getByText('Test User is logged in.')).toBeVisible()
})
})

describe('When logged in', () => {

    beforeEach(async ({ page }) => {
        await loginWith(page, 'testuser', 'testuser')
    })

    test('a new blog can be created', async ({page}) => {
        await createBlog(page, 'New day new test', 'Krisata but anonymous', 'playwright.dev')
        await expect(page.locator('.blog', { hasText: 'New day new test' })).toBeVisible()

    })
    test('a blog can be liked', async ({page}) => {
        await createBlog(page, 'New day new test', 'Krisata but anonymous', 'playwright.dev')
        const blogToBeLiked = await page.getByText('New day new test')
        await blogToBeLiked.getByRole('button', { name: 'View' }).click()
        await blogToBeLiked.getByRole('button', { name: 'Like' }).click()
        await expect(blogToBeLiked.getByText('Likes: 1')).toBeVisible()

    })
    test('a blog can be deleted by the creator', async ({page}) => {
        await createBlog(page, 'Delete test', 'Krisata but anonymous', 'playwright.dev')
        const blogToBeRemoved = page.locator('.blog', { hasText: 'Delete test' })
        await blogToBeRemoved.getByRole('button', { name: 'View' }).click()

        page.on('dialog', async dialog => {await dialog.accept()})
        await blogToBeRemoved.getByRole('button', { name: 'remove' }).click()
        await expect(page.locator('.blog', { hasText: 'Delete test' })).toHaveCount(0, { timeout: 5000 })
    })
})
})

