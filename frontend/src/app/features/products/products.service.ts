import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get(`${environment.apiUrl}/products`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Error fetching products'));
      }),
      tap((products: any) => {
        console.log('Products fetched successfully:', products);
      }),
      map((products: any) => products)
    );
  }

  // Create a new product
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product);
  }

  // Update an existing product
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
