import {test, expect} from '@playwright/test';

const html = `
<button onclick="document.getElementById('status').textContent = 'Saving...'; setTimeout(() => document.getElementById('status').textContent = 'Saved', 2000)">Save</button>
<p id="status" data-test="status">Ready</p>
`;

test('상태 - 클릭 전', async({page}) => {
    await page.setContent(html);
    await expect(page.getByTestId('status')).toHaveText('Ready')
})

test('상태 - 저장 후', async({page}) => {
    await page.setContent(html);
    await page.getByRole('button', {name: 'Save'}).click();
    //expect(await page.getByTestId('status').textContent()).toBe('Saved')
    await expect(page.getByTestId('status')).toHaveText('Saved');
})