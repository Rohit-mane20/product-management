import { Component, OnInit, signal, WritableSignal, effect } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ConfirmationDialogComponent } from '../../../core/confirmation-dialog/confirmation-dialog.component';
import { ProductsService } from '../products.service';
import { NotificationService } from '../../../core/notification/notification.service';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CurrencyFormatPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  user: WritableSignal<User | null> = signal<User | null>(null);
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'actions'];
  dialogClose$: any;

  constructor(
    private readonly auth: AuthService,
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly productsService: ProductsService,
    private readonly notification: NotificationService
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    const initialProducts: Product[] = this.route.snapshot.data['products'] ?? [];
    this.products.set(initialProducts);
    effect(() => {
      console.log(this.user())
    });
  }

  ngOnInit() {
    const currentUser = this.auth.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
    }
  }

  openDeleteDialog(product: Product): void {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete '${product.name}'?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
  this.dialogClose$ =  ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productsService.deleteProduct(product.id).subscribe({
          next: () => {
            this.notification.success('Product deleted successfully');
            this.products.update(list => list.filter(p => p.id !== product.id));
          },
          error: () => this.notification.error('Failed to delete product')
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: null
    });
    this.dialogClose$ = dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.products.update(list => [...list, result]);
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: product
    });
   this.dialogClose$ = dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.products.update(list => list.map(p => p.id === result.id ? result : p));
      }
    });
  }

  ngOnDestroy(): void {
    this.products.set([]);
    if (this.dialogClose$) {
      this.dialogClose$.unsubscribe();
    }
  }
}
