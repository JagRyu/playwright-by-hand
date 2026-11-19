import {test, expect} from '@playwright/test';

const html = `
<button onclick="setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<p>Saved</p>'), 2000)">Save</button>
<button onclick="setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<p>Saved</p>'), 7000)">Slow Save</button>
`;

test('저장 - 고정 대기', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save', exact:true}).click();
    await page.waitForTimeout(3000);
    expect(await page.getByText('Saved').isVisible()).toBe(true);
})

test('저장 - 기다리는 확인', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save', exact: true}).click();
    await expect(page.getByText('Saved')).toBeVisible();
})

test('느린 저장 - 늘린 확인', async({page})=>{
    await page.setContent(html);
    await page.getByRole('button', {name: 'Slow Save'}).click();
    await expect(page.getByText('Saved')).toBeVisible({timeout: 10000});
})