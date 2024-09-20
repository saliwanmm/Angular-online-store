import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Order } from '../../shared/interfaces';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = []
  pSub: Subscription | null = null
  rSub: Subscription | null = null

  constructor(
    private orderServ: OrderService
  ) {}

  ngOnInit(): void {
    this.pSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.rSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }
}
