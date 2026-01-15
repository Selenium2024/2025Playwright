import {test as base,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'node:console';


type MyFixtures={
    homepage:HomePage;
}
export const test=base.extend<MyFixtures>({

    homepage: async({page,baseURL},use,testInfo)=>{  

        const loginpage=new LoginPage(page);
        await loginpage.goToLoginPage(baseURL);
        const userName=testInfo.project.metadata.appUserName;
        const password=testInfo.project.metadata.appPassword;
        const homepage=await loginpage.doLogin(userName,password);
        expect(await homepage.isUserLoggedIn()).toBeTruthy();
        await use(homepage);
    }
});
export {expect};