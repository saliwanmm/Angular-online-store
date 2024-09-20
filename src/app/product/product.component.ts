import { Component, Input, OnInit } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, QuillModule, RouterOutlet, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private productServ: ProductService,
  ) {}

  ngOnInit(): void {
  }

  addProduct(product: Product) {
    this.productServ.addProduct(product)
  }
}
