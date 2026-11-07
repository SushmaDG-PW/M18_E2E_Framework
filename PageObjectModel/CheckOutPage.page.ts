import {Page, Locator, expect} from "@playwright/test"
import data from "../DDT/userpayment.json"
import path from "path"
import fs from "fs"

class CheckOutPage{
    page:Page
    placeOrderBTN:Locator
    cardName:Locator
    cardNumber:Locator
    CVC:Locator
    month:Locator
    year:Locator
    confirmOrderBTN:Locator
    orderMessage:Locator
    downloadInvoice:Locator
    continueBTN:Locator

    constructor(page:Page){
        this.page=page
        this.placeOrderBTN=page.getByRole("link",{name:"Place Order",exact:true})
        this.cardName=page.locator('//input[@data-qa="name-on-card"]')
        this.cardNumber=page.locator('//input[@data-qa="card-number"]')
        this.CVC=page.locator('//input[@data-qa="CVC"]')
        this.month=page.getByPlaceholder("MM",{exact:true})
        this.year=page.getByPlaceholder("YY",{exact:true})
        this.confirmOrderBTN=page.locator('#submit')

        this.orderMessage=page.locator('//p[contains(text(),"Congratulations!")]')
        this.downloadInvoice=page.getByRole("link",{name:"Download Invoice",exact:true})
        this.continueBTN=page.getByRole("link",{name:"Continue",exact:true})
    }

    async checkout(){
        await this.placeOrderBTN.click()
        await this.cardName.fill(data.name)
        await this.cardNumber.fill(data.carNumber)
        await this.CVC.fill(data.CVC)
        await this.month.fill(data.expiryMonth)
        await this.year.fill(data.expiryYear)
        await this.confirmOrderBTN.click()
    }

    async verifyOrderMessage(){
        await expect(this.orderMessage).toContainText(data.orderMessage)
    }

    async InvoiceDownload(){
        let [downloadfile]=await Promise.all([this.page.waitForEvent('download'),this.downloadInvoice.click()])
        let downloadfolder="C:/Users/Personal/Desktop/download"
        let filename= await downloadfile.suggestedFilename()
        await downloadfile.saveAs(path.join(path.join(downloadfolder,filename)))

        let filepath=path.join(downloadfile,filename)

        let data=fs.readFileSync(filepath,'utf-8')

        await expect(data).toContain("Thank you")
        await this.continueBTN.click()
    }

}

export default CheckOutPage