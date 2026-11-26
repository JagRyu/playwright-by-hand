import {test, expect} from '@playwright/test';

test('느린 로그인 - 상품 화면', async({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('performance_glitch_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    //await expect(page.getByRole('button', {name: 'Login'})).toBeHidden();
    await expect(page.getByRole('button', {name: 'Login'})).toBeHidden({timeout: 10000});
    //await expect(page.getByText('Products')).toBeVisible()

})

test('로그인 후 - 로그인 버튼 사라짐', async({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeHidden();
})