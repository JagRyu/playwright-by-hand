import {test, expect} from '@playwright/test';

test('장바구니 담기', async({page})=> {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

})