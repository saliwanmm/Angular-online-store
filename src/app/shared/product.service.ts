import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { FbResponse, Product } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'Phone'
    cartProduct: Product[] = []

  constructor(private http: HttpClient) { }

  create(product: Product) {
    return this.http.post<FbResponse>(`${environment.fbDbUr}/products.json`, product)
    .pipe(map((res: FbResponse) => {
      return {
        ...product,
        id: res.name,
        date: new Date(product.date)
      }
    }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get<{[key: string]: Product}>(`${environment.fbDbUr}/products.json`)
    .pipe(map(res => {
      return Object.keys(res)
      .map(key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.fbDbUr}/products/${id}.json`)
      .pipe(
        map(product => {
          if (!product) {
            throw new Error('Product not found');
          }
          return {
            ...product,
            id,
            date: new Date(product.date)
          };
        })
      );
  }

  remove(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.fbDbUr}/products/${id}.json`)
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.fbDbUr}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type
  }

  addProduct(product: Product) {
    this.cartProduct.push(product)
  }
}
