import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AdminService} from "../../service/admin.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['imageUrl', 'title', 'category', 'price', 'quantity'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAllProducts().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res; // Assign data to MatTableDataSource
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
