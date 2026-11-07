import {test} from "@playwright/test"
import ProductPage from "../PageObjectModel/ProductPage.page"
import Registerpage from "../PageObjectModel/RegisterPage.page"
import CartPage from "../PageObjectModel/CartPage.page"
import CheckOutPage from "../PageObjectModel/CheckOutPage.page"

test("purchase product", async({page})=>{
    let registerPage = new Registerpage(page)
    await registerPage.navigateToRegister()
    await registerPage.enterSignupDetails()
    await registerPage.fillAccountDetails()

    let productPage=new ProductPage(page)
    productPage.addToCart()

    let cartPage = new CartPage(page)
    await cartPage.proceedToCheckout()

    let checkoutPage = new CheckOutPage(page)
    await checkoutPage.checkout()
    await checkoutPage.verifyOrderMessage()
    await checkoutPage.InvoiceDownload()

})