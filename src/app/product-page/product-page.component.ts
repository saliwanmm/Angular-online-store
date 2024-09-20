import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { RouterOutlet, RouterLink } from '@angular/router';

import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, QuillModule, RouterOutlet, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  product$!: Observable<Product>;

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.product$ = this.route.params
    .pipe(switchMap(params => {
      return this.productServ.getById(params['id'])
    }))
  }

  addProduct(product: Product) {
    this.productServ.addProduct(product)
  }
}
