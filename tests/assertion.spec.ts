import {test, expect} from '@playwright/test' ;

test('Hard A', async ({page}) => {
await page.goto('https://demowebshop.tricentis.com/');
// await page.waitForTimeout(5000)
await expect(page).toHaveTitle('Demo Web Shop');
});

