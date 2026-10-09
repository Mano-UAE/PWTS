import {test, expect } from "@playwright/test";
// syntax
// test("title" ,()=>{
// step1
// step2
// })

test("Launch Browser Check",async({page})=>{
    await page.goto("https://nodejs.org/en/download");
    let title:string=await page.title();
    console.log("Page Title", title);
    await expect (page).toHaveTitle("Node.js — Download Node.js®");
       await page.pause();

})