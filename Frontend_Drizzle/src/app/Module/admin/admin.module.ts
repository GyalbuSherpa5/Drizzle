import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './components/admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OrderTableComponent} from './components/order-table/order-table.component';
import {CustomersComponent} from './components/customers/customers.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {CreateProductComponent} from './components/create-product/create-product.component';


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
    AdminRoutingModule
  ]
})
export class AdminModule { }
