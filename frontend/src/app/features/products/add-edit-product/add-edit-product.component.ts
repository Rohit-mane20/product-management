import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../shared/models/product';
import { ProductsService } from '../products.service';
import { NotificationService } from '../../../core/notification/notification.service';
@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null,
    private notification: NotificationService
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price != null ? data.price : '', [Validators.required, Validators.min(1)]],
      category: [data?.category || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const productData = this.form.value;
    if (this.isEdit && this.data?.id != null) {
      this.productsService.updateProduct(this.data.id, productData)
        .subscribe({
          next: (updated: Product) => {
            this.notification.success('Product updated successfully');
            this.dialogRef.close(updated);
          },
          error: () => this.notification.error('Failed to update product')
        });
    } else {
      this.productsService.createProduct(productData)
        .subscribe({
          next: (created: Product) => {
            this.notification.success('Product created successfully');
            this.dialogRef.close(created);
          },
          error: () => this.notification.error('Failed to create product')
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 