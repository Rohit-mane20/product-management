import { Routes } from '@angular/router';
import { ProductsComponent } from './list/products.component';
import { ProductsResolver } from './list/products.resolver';
import { AuthGuard } from '../../core/auth/auth.guard';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: { products: ProductsResolver },
    canActivate: [AuthGuard],
  }
]; 