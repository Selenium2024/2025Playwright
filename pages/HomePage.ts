import { Locator, Page } from "@playwright/test";    
import { ElementUtil } from "../utils/ElementUtil";         
import { LoginPage } from "./LoginPage";
import { ResultPage } from "./ResultPage";

export class HomePage{

    readonly page:Page; 
    private readonly eleUtil;
    private readonly searchTextBox:Locator;
    private readonly searchIcon:Locator;
    private readonly logoutLink:Locator;
    private readonly continueLink:Locator;

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.searchTextBox=page.getByRole('textbox',{name:'Search'});
        this.searchIcon=page.locator('#search button[type="button"]');
        this.logoutLink=page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[text()='Logout']");
        this.continueLink=page.locator("//a[text()='Continue']");


    }   

    async isUserLoggedIn():Promise<boolean>{

        return await this.eleUtil.isVisible(this.logoutLink);
    }

    async logout():Promise<LoginPage>{

        await this.eleUtil.click(this.logoutLink);
        await this.eleUtil.click(this.continueLink);
        return new LoginPage(this.page) ;
       }

        async doSearch(productName:string):Promise<ResultPage>{
        this.eleUtil.fill(this.searchTextBox,productName);
        this.eleUtil.click(this.searchIcon,{timeout:5000});
        return new ResultPage(this.page);
       }

}