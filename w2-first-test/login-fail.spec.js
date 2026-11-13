import {test, expect} from '@playwright/test';

test('비밀번호 틀림', async({page})=> {

    //Epic sadface: Username and password do not match any user in this service
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong');
    await page.getByRole('button', {name:'Login'}).click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();

});

test('잠긴 사용자', async ({page})=>{

    //Epic sadface: Sorry, this user has been locked out.
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name:'Login'}).click();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
})