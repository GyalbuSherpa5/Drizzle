import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../State/User/user.service";
import {MessageService} from "../../../shared/components/MessageService";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customerTableDisplay: string[] = ['firstName', 'lastName', 'email'];
  allCustomerColumns: string[] = ['image', ...this.customerTableDisplay];
  customerTable = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe({
      next: (customers: any) => {
        customers.sort((a: any, b: any) => b.id - a.id);
        this.customerTable.data = customers;
      },
      error: (error: any) => {
        console.log(error);
        this.messageService.showErrorSnackBar('Error fetching users');
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

  getUserInitials(user: any): string {
    // Logic to extract initials (e.g., first letters of first and last name)
    const firstNameInitial = user.firstName.charAt(0);
    const lastNameInitial = user.lastName.charAt(0);
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase(); // Assuming you want uppercase
  }

  applyFilter(event: Event) {
    this.customerTable.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
