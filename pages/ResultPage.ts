import {Locator,Page} from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil'; 
import { ProductInfoPage } from './ProductInfoPage';

export class ResultPage{

    private readonly page:Page; 
    private readonly eleUtil;
    private readonly searchResult:Locator;

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.searchResult=page.locator('.product-thumb');
    }

    async getSearchResultCount():Promise<number>{
        await this.searchResult.first().waitFor({ state: 'visible' })
        console.log(`Total search results found: ${await this.searchResult.count()}`);
        return await this.searchResult.count();
    }

    async selectProduct(productName:String):Promise<ProductInfoPage>{
        console.log(`Selecting the product: ${productName}`);
        await this.eleUtil.click(this.page.getByRole('link',{name:'${productName} '}));
        return new ProductInfoPage(this.page);
    }

}