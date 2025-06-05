import {Page, Locator} from "@playwright/test"
import { BaseComponent } from './base.component.ts';

export  type SortOptions = 'name,asc'| 'name,desc'  | 'price,desc'  | 'price,asc'; 

export class SortComponent extends BaseComponent{

    private dropdown = this.page.locator('select[data-test="sort"]');

    async selectSortOption(option: SortOptions) {
        await this.dropdown.selectOption(option);
      }
}
