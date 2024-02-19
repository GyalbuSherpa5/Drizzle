import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../service/admin.service";
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
    brand: ['', Validators.required],
    color: ['', Validators.required],
    imageUrl: ['', Validators.required],
    topLevelCategory: ['', Validators.required],
    secondLevelCategory: ['', Validators.required],
    thirdLevelCategory: ['', Validators.required],
  });

  topLevelCategory: string[] = ['Smart Phone', 'Laptop', 'Tablets', 'Camera', 'Printer'];
  secondLevelCategory: string[] = [];

  secondLvlCategorySmartPhone: string[] = ['Samsung', 'Apple', 'Redmi', 'Xiaomi', 'Oppo','OnePlus'];
  secondLvlCategoryLaptop: string[] = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'];
  secondLvlCategoryTablets: string[] = ['Apple', 'Samsung', 'Lenovo', 'Huawei', 'Microsoft'];
  secondLvlCategoryCamera: string[] = ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic'];
  secondLvlCategoryPrinter: string[] = ['HP', 'Canon', 'Epson', 'Brother', 'Samsung'];

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
        this.myForm.valid;
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

  onFirstLevelCategoryChange(selectedCategory: string): void {
    switch (selectedCategory) {
      case 'Smart Phone':
        this.secondLevelCategory = this.secondLvlCategorySmartPhone;
        break;
      case 'Laptop':
        this.secondLevelCategory = this.secondLvlCategoryLaptop;
        break;
      case 'Tablets':
        this.secondLevelCategory = this.secondLvlCategoryTablets;
        break;
      case 'Camera':
        this.secondLevelCategory = this.secondLvlCategoryCamera;
        break;
      case 'Printer':
        this.secondLevelCategory = this.secondLvlCategoryPrinter;
        break;
      default:
        this.secondLevelCategory = [];
    }
    this.myForm.get('secondLevelCategory')?.setValue('');
  }
}
