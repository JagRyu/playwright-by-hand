import { test, expect } from '@playwright/test';
//console.log(typeof test, typeof expect);
console.log(typeof test, typeof expect);


test('로그인 성공', async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    //console.log(page.getByPlaceholder('Username'));
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    //console.log(page.url());
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});