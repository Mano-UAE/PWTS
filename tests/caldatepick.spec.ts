import{test,expect} from '@playwright/test'

test("verify css",async ({page}) =>{
    await page.goto("https://www.booking.com/");
     await page.waitForLoadState
      await page.keyboard.press('Control+Meta+F')
    await page.waitForTimeout(9000)
    await page.pause();
  
       
})