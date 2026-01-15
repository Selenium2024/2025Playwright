import {Page,Locator} from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from './HomePage';

export class LoginPage{

    //Page locator or Page object 

    private readonly page:Page;
    private readonly eleUtil;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly warningMsg:Locator;

    //constructor
    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.loginBtn=page.locator('//input[@type="submit"]');
        this.warningMsg=page.locator('.alert.alert-danger.alert-dismissible');
    }
// Page actions

async goToLoginPage(baseURL:string|undefined){

    await this.page.goto(baseURL+"?route=account/login");
}
/**
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async doLogin(email:string,password:string):Promise<HomePage>{
   await this.eleUtil.fill(this.emailId,email);
   await this.eleUtil.fill(this.password,password);
   await this.eleUtil.click(this.loginBtn, {force:true,timeout:5000});
   
   return new HomePage(this.page) ;
}
/**
 * 
 * @returns 
 */
async getWarningMessage():Promise<string|null>{
    const errorMessage=await this.eleUtil.getText(this.warningMsg);
    console.log(`Login failed with error message: ${errorMessage}`);
    return errorMessage;
}
}