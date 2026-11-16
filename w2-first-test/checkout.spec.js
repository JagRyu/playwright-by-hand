import {test, expect} from '@playwright/test';

test('결제 - 이름 비움', async({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await page.getByTestId('shopping-cart-link').click();
    await page.getByRole('button', {name: "Checkout"}).click();
    await expect(page).toHaveURL(/checkout-step-one/)

    await page.getByRole('button', {name: "Continue"}).click();
    await expect(page.getByText('Error: First name is required')).toBeVisible();
});

test('결제 - 정보 입력', async({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await page.getByTestId('shopping-cart-link').click();
    await page.getByRole('button', {name: "Checkout"}).click();
    await expect(page).toHaveURL(/checkout-step-one/)

    await page.getByPlaceholder('First Name').fill('Ryu');
    await page.getByPlaceholder('Last Name').fill('Jag');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', {name: "Continue"}).click();

    await expect(page).toHaveURL(/checkout-step-two/)
});