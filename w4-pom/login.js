export async function login(page, user) {
    await page.goto('https://www.saucedemo.com')
    await page.getByPlaceholder('Username').fill(user);
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
}