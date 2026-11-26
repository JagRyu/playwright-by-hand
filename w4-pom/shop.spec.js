import {test, expect} from '@playwright/test';
import { login } from './login';

test('로그인 - 상품 화면', async({page})=>{
    await login(page, 'standard_user');
    await expect(page.getByText('Products')).toBeVisible();
})

test('장바구니 - 담기', async({page})=>{
    await login(page, 'standard_user');
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
})

test('느린 로그인', async({page})=>{
    await login(page, 'performance_glitch_user');
    await expect(page.getByText('Products')).toBeVisible({ timeout: 10000 });
})