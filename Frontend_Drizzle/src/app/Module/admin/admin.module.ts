import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './components/admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OrderTableComponent} from './components/order-table/order-table.component';
import {CustomersComponent} from './components/customers/customers.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TableModule} from "primeng/table";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    OrderTableComponent,
    CustomersComponent,
    AdminProductsComponent,
    CreateProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule
  ]
})
export class AdminModule { }
