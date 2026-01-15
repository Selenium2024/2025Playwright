import{Page,Locator} from '@playwright/test';
import{test} from '@playwright/test';
import { link } from 'node:fs';

test("Verify login",async({page})=>{
  
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login",{timeout:5000});
  await page.getByRole('textbox',{name:"E-Mail Address"}).fill("pwtest@nal.com");
  await page.getByRole('textbox',{name:"password"}).fill("test123");
  await page.locator('//input[@type="submit"]').click();
  await page.getByRole('textbox',{name:'search'}).fill("macbook");
  await page.keyboard.press('Enter');
  await page.getByRole('link',{name:'MacBook Pro'}).first().click();
  const metaData:string[]=await page.locator(`(//div[@id="content"]//ul[@class='list-unstyled'])[1]//li`).allInnerTexts();
  console.log(`Total product metadata: ${metaData.length}`);
  for(const data of metaData){
    console.log(data);
}
    
})