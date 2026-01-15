import{test,expect} from '../fixture/myfixture';
import { LoginPage } from "../pages/LoginPage"; 

test('Verify valid Login',async({homepage})=>{

    await expect(homepage.page).toHaveTitle(/My Account/);
    
    
})

test("Invalid Login",{tag:['@Login','@smoke','@sanity']},async({page,baseURL})=>{
    let loginPage=new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin("mahesh","bhalla");
    const actualErrorMessage=await loginPage.getWarningMessage();
    expect(actualErrorMessage).toBe(" Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.");
})
