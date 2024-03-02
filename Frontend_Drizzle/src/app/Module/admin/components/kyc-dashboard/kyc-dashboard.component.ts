import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../../State/User/user.service";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-kyc-dashboard',
  templateUrl: './kyc-dashboard.component.html',
  styleUrls: ['./kyc-dashboard.component.scss']
})
export class KycDashboardComponent implements OnInit {
  customerTable!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'email', 'kycStatus', 'actions'];

  @ViewChild(MatPaginator) kycPaginator!: MatPaginator;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUnverifiedUser().subscribe((data: any) => {
      this.customerTable = new MatTableDataSource(data);
      this.customerTable.paginator = this.kycPaginator;
    });
  }

  changeKycStatus(userId: number, kycStatus: string) {
    this.userService.changeKycStatus(userId, kycStatus).subscribe(() => {
      this.userService.getAllUnverifiedUser().subscribe((data: any) => {
        this.customerTable = new MatTableDataSource(data);
        this.customerTable.paginator = this.kycPaginator;
      });
    });
  }

  applyFilter(event: Event) {
    this.customerTable.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  mapKycStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return '#f0f0f0';
      case 'APPROVED':
        return '#00cc00';
      case 'REJECTED':
        return '#ff0505';
      default:
        return '#ff0505';
    }
  }
}
