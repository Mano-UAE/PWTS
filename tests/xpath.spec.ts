import{test,expect} from '@playwright/test'

test("verify xpath",async ({page}) =>{
    await page.goto("https://demowebshop.tricentis.com/")
   
      await page.pause()
})