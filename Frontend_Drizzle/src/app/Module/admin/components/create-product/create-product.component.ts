import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  myForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discountedPrice: [0, [Validators.min(0)]],
    discountPercent: [0, [Validators.min(0), Validators.max(100)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    brand: [''],
    color: [''],
    size: [''],
    imageUrl: [''],
    topLevelCategory: [''],
    secondLevelCategory: [''],
    thirdLevelCategory: [''],
  });

  availableSizes: string[] = ['Small', 'Medium', 'Large', 'XL', 'XXL'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
  }

  handleSubmit() {
    const formValue = this.myForm.value;
    this.adminService.addProduct(formValue).subscribe({
      next: () => {
        this.myForm.reset();
        this.showSuccessSnackBar('Product added successfully');
      },
      error: (error: any) => {
        console.log(error);
        this.showErrorSnackBar('Error adding product');
      }
    });
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

}
