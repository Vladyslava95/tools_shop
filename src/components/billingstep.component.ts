import {Page, Locator} from "@playwright/test"
import { getAddressData } from "../../utilities/utils.ts";
import { BaseComponent } from './base.component.ts';

export class BillingStep extends BaseComponent {

    private checkoutButton = this.page.getByTestId('proceed-3'); 
    private address = this.page.getByTestId('street');
    private city = this.page.getByTestId('city');
    private state = this.page.getByTestId('state');
    private country = this.page.getByTestId('country');
    private postcode = this.page.getByTestId('postal_code');

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };

    async fillAddressData() {
        const addressData = getAddressData();
        await this.address.fill(addressData.street);
        await this.city.fill(addressData.city);
        await this.state.fill(addressData.state);
        await this.country.fill(addressData.country);
        await this.postcode.fill(addressData.code);
    };

}