import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../service/admin.service';
import {MessageService} from '../../../shared/components/MessageService';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productTableDisplay: string[] = ['imageUrl', 'title', 'category', 'price', 'quantity', 'delete'];
  productTable: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private messageService: MessageService
  ) {
    this.productTable = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.adminService.getAllProducts().subscribe({
      next: (products: any) => {
        products.sort((a: any, b: any) => b.id - a.id);
        this.productTable.data = products;
        this.productTable.paginator = this.paginator; // Set paginator after data is loaded
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching products');
      }
    });
  }

  getColumnHeader(columnName: string): string {
    // Return column header text based on column name
    switch (columnName) {
      case 'imageUrl':
        return 'Image';
      case 'delete':
        return 'Actions';
      default:
        return columnName;
    }
  }

  getCategoryName(element: any): string {
    // Extract nested category name
    if (element?.parentCategory?.parentCategory) {
      return element.parentCategory.parentCategory.name;
    } else if (element?.parentCategory) {
      return element.parentCategory.name;
    } else {
      return element.category.name;
    }
  }

  deleteProduct(product: any): void {
    // Implement delete product functionality here
    console.log('Deleting product:', product);
  }

  applyFilter(event: Event) {
    this.productTable.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
