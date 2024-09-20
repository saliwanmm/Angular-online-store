import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Product } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';
import { ProductComponent } from "../product/product.component";
import { SortingPipe } from '../shared/sorting.pipe';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent, SortingPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    public productServ: ProductService
  ) {}

  ngOnInit() {
    this.products$ = this.productServ.getAll()
  }
}
