import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductsService } from '../products.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<any> {
  constructor(private productService: ProductsService) {}

  resolve(): Observable<any> {
    return this.productService.getAllProducts().pipe(tap((products) => {
      console.log(products, 'products');
    }));
  }
}