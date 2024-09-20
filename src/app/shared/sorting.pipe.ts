import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './interfaces';

@Pipe({
  name: 'sorting',
  standalone: true
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type: string): Product[] {

    return products.filter(product => {
      return product.type == type
    })
  }

}
