import {Page, Locator} from "@playwright/test"

export  type SortOptions = 'name,asc'| 'name,desc'  | 'price,desc'  | 'price,asc'; 

export class SortComponent {

    private dropdown: Locator;

    public constructor (private page: Page ) {
        this.dropdown = this.page.locator('select[data-test="sort"]');    
    };


    async selectSortOption(option: SortOptions) {
        await this.dropdown.selectOption(option);
      }
}
