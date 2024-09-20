import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  type: string = "Phone"

  constructor(
    private router: Router,
    private productServ: ProductService,
  ) {}

  ngOnInit(): void {
    
  }

  setType (type: string) {
    this.type = type

    if (this.type !== "Cart") {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      })

      this.productServ.setType(this.type)
    }
  }

}
