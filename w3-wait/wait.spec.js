import {test, expect} from '@playwright/test';

const html = `<button onclick="setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<p>Saved</p>'), 2000)">Save</button>`;


test('저장 - 기다리는 확인', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save'}).click();
    await expect(page.getByText('Saved')).toBeVisible()
});

test('저장 - 한 번 보는 확인', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save'}).click();
    //expect(await page.getByText('Saved').isVisible()).toBe(true)
    await expect(page.getByText('Saved')).toBeVisible()
});