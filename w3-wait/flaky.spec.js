import {test, expect} from '@playwright/test';

const html = `
<button onclick="setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<p>Saved</p>'), 1000 + Math.random() * 3000)">Save</button>
`;

test('랜덤 저장 - 고정 대기', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save'}).click();
    //await page.waitForTimeout(3000);
    //expect(await page.getByText('Saved').isVisible()).toBe(true)
    await expect(page.getByText('Saved')).toBeVisible();
})

test('랜덤 저장 - 기다리는 확인', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save'}).click();
    await expect(page.getByText('Saved')).toBeVisible()
})