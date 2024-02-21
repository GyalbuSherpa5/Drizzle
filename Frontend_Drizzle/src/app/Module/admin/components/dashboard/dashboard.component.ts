import {Component} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MessageService} from "../../../shared/components/MessageService";
import {UserService} from "../../../../State/User/user.service";
import {OrderService} from "../../../../State/service/order.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  productTableDisplay: string[] = ['imageUrl', 'title', 'category', 'price', 'quantity', 'delete'];
  productTable = new MatTableDataSource<any>();

  customerTableDisplay: string[] = ['firstName', 'lastName', 'email'];
  allCustomerColumns: string[] = ['image', ...this.customerTableDisplay];
  customerTable = new MatTableDataSource<any>();

  orderTableDisplay: string[] = ['imageUrl', 'title', 'price', 'id', 'status', 'update', 'delete'];
  orderTable = new MatTableDataSource<any>();

  constructor(
    private userService: UserService,
    private adminProduct: AdminService,
    private orderService: OrderService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.adminProduct.getAllProducts().subscribe({
      next: (products: any) => {
        products.sort((a: any, b: any) => b.id - a.id);
        this.productTable.data = products.slice(0, 5);
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching products');
      }
    });

    this.userService.findAllUsers().subscribe({
      next: (customers: any) => {
        customers.sort((a: any, b: any) => b.id - a.id);
        this.customerTable.data = customers.slice(0, 5);
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching users');
      }
    });

    this.orderService.getOrderHistory().subscribe({
      next: (orders) => {
        console.log(orders);
        orders.sort((a: any, b: any) => b.id - a.id);

        this.orderTable.data = orders.slice(0, 5).map(order => {
          const orderItems = order.orderItems;

          const images = orderItems.map(item => item.product.imageUrl);
          const titles = orderItems.map(item => item.product.title);

          return {
            imageUrl: images,
            title: titles,
            price: order.discount,
            id: order.id,
            status: order.orderStatus,
            update: 'update',
            delete: 'delete'
          };
        });
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching orders');
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

  getUserInitials(user: any): string {
    // Logic to extract initials (e.g., first letters of first and last name)
    const firstNameInitial = user.firstName.charAt(0);
    const lastNameInitial = user.lastName.charAt(0);
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase(); // Assuming you want uppercase
  }

  mapOrderStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return '#f0f0f0';
      case 'PLACED':
        return '#f0f0f0';
      case 'CONFIRMED':
        return '#00cc00';
      case 'SHIPPED':
        return '#ffcc00';
      case 'DELIVERED':
        return '#40e0d0';
      default:
        return '#ff0505';
    }
  }
}
