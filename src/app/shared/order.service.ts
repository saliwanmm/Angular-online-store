import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { FbResponse, Order, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post<FbResponse>(`${environment.fbDbUr}/orders.json`, order)
    .pipe(map((res: FbResponse) => {
      return {
        ...order,
        id: res.name,
        date: new Date(order.date)
      }
    }))
  }

  getAll(): Observable<Order[]> {
    return this.http.get<{[key: string]: Order}>(`${environment.fbDbUr}/orders.json`)
    .pipe(map(res => {
      return Object.keys(res)
      .map(key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  remove(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.fbDbUr}/orders/${id}.json`)
  }
}
