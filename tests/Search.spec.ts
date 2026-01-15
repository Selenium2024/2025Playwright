import { expect, test } from '../fixture/myfixture';
import { ResultPage } from '../pages/ResultPage';

let product= [
{searchKey:"macBook",expectedCount:3},
{searchKey:"iMac",expectedCount:1}
]


for (const data of product) {


test(`Verify search Result ${data.searchKey}`, async({homepage})=>{
    let resultPage:ResultPage=await homepage.doSearch(data.searchKey);
    expect(await resultPage.getSearchResultCount()).toBe(data.expectedCount);   
})
}