import {Page,Locator} from "@playwright/test"
import data from "../DDT/userdata.json"

class ProductPage {
    page:Page
    productsLink:Locator
    searchProductTF:Locator
    searchBTN:Locator
    viewProductLink:Locator
    addToCartBTN:Locator
    continueShoppingBTN:Locator

    constructor(page:Page){
        this.page=page
        this.productsLink=page.locator('//a[@href="/products"]').last()
        this.searchProductTF=page.locator('input#search_product')
        this.searchBTN=page.locator('button#submit_search')
        this.viewProductLink=page.locator('//a[@href="/product_details/1"]')
        this.addToCartBTN=page.locator('//button[@class="btn btn-default cart"]')
        this.continueShoppingBTN=page.getByRole('button',{name:"Continue Shopping",exact:true})
    }

    async addToCart(){
        await this.productsLink.click()
        await this.searchProductTF.fill(data.productName)
        await this.searchBTN.click()
        await this.viewProductLink.click()
        await this.addToCartBTN.click()
        await this.continueShoppingBTN.click()
    }
}

export default ProductPage