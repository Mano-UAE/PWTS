import{test,expect} from '@playwright/test'
import { exec } from 'child_process';

test("verify css",async ({page}) =>{
    await page.goto("https://demowebshop.tricentis.com/")
      exec(`
    osascript -e 'tell application "Microsoft Edge" to activate' \
              -e 'tell application "System Events" to keystroke "f" using {control down, command down}'
  `);
   await page.waitForLoadState('domcontentloaded')
    await page.pause()
})