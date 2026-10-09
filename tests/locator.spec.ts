import {test,expect} from'@playwright/test'
test("verify pw locators", async ({page}) =>{

await page.goto("https://demo.nopcommerce.com/");
await page.pause()
})
