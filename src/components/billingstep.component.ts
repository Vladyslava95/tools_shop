import {Page, Locator} from "@playwright/test"
import { getAddressData } from "../../utils";

export class BillingStep {

    private checkoutButton: Locator;
    private address: Locator;
    private city: Locator;
    private state: Locator;
    private country: Locator;
    private postcode: Locator;

    public constructor (private page: Page ) {
        this.checkoutButton = this.page.getByTestId('proceed-3');   
        this.address = this.page.getByTestId('street');
        this.city = this.page.getByTestId('city');
        this.state = this.page.getByTestId('state');
        this.country = this.page.getByTestId('country');
        this.postcode = this.page.getByTestId('postal_code');
    };

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };

    async fillAddressData() {
        const addressData = getAddressData();
        await this.address.fill(addressData.address);
        await this.city.fill(addressData.city);
        await this.state.fill(addressData.state);
        await this.country.fill(addressData.country);
        await this.postcode.fill(addressData.postcode);
    };

}