import{test,expect} from '@playwright/test'

const pageurl='https://sdetqa.vercel.app/autoplay.html';

test.describe('data', () =>{

    test.beforeEach(async ({ page }) =>{
        await page.goto(pageurl);
    });
    //page load validation
     test('page load check' , async({page})=>{
     await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
     await expect (page.getByText('Autoplay')).toBeVisible();
    })
});

