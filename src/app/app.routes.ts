import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ProductsComponent } from './features/products/list/products.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ProductsResolver } from './features/products/list/products.resolver';
export const routes: Routes = [{
        path: '',   
        redirectTo : 'login',
        pathMatch : 'full'
        },
    {
        path: 'login',
        component: LoginComponent,
        },
    {
        path: 'products',
        component: ProductsComponent,
        resolve: { products: ProductsResolver },
        canActivate: [AuthGuard],
        }

];
