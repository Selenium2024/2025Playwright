import{Locator, Page} from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil';
export class ProductInfoPage{

    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly imageCount:Locator;

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.imageCount=page.locator('div#content img');
    }

    async getImageCount():Promise<number>{
        this.eleUtil.waitForElementVisible(this.imageCount);
        const imgCount=await this.imageCount.count();
        return imgCount;
    }




}