import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  model: any[] = [];

  ngOnInit() {
    this.updateMenu();
  }

  updateMenu() {
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Dashboard',
            icon: 'dashboard',
            routerLink: ['dashboard'],
          },
          {
            label: 'Products',
            icon: 'shopping_basket',
            routerLink: ['products'],
          },
          {
            label: 'Orders',
            icon: 'fastfood',
            routerLink: ['orders'],
          },
          {
            label: 'Customers',
            icon: 'supervised_user_circle',
            routerLink: ['customers'],
          }
          ,
          {
            label: 'Create Product',
            icon: 'add_box',
            routerLink: ['create-product'],
          }
        ]
      }
    ];
  }

}
