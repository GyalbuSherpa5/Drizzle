import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AdminService} from "../../service/admin.service";
import {OrderService} from "../../../../State/service/order.service";
import {MessageService} from "../../../shared/components/MessageService";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {

  orderTableDisplay: string[] = ['imageUrl', 'title', 'price', 'id', 'username', 'status', 'update', 'delete'];
  orderTable = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private orderService: OrderService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.adminService.getAllOrders().subscribe({
      next: (orders) => {
        orders.sort((a: any, b: any) => b.id - a.id);
        this.orderTable.data = orders.map(order => {
          const orderItems = order.orderItems;

          const images = orderItems.map(item => item.product.imageUrl);
          const titles = orderItems.map(item => item.product.title);

          return {
            imageUrl: images,
            title: titles,
            price: order.discount,
            id: order.id,
            username: order.user.firstName + " " + order.user.lastName,
            status: order.orderStatus,
            update: 'update',
            delete: 'delete'
          };
        });
        this.orderTable.paginator = this.paginator;
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching orders');
      }
    });
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

  onUpdateStatus(orderId: number, status: string) {

    this.adminService.changeOrderStatus(orderId, status).subscribe({
      next: () => {
        this.messageService.showSuccessSnackBar('Order status updated');
        this.getAllOrders();
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error updating order status');
      }
    });
  }

  applyFilter(event: Event) {
    this.orderTable.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
