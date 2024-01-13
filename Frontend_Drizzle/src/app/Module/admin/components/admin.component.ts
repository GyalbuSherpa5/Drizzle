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
            label: 'Home',
            icon: 'pi pi-home',
            // command: () => this.home()
          },
          {
            label: 'Orders',
            icon: 'pi pi-arrow-circle-up',
            routerLink: ['orders'],
          },
          {
            label: 'Products',
            icon: 'pi pi-arrow-circle-up',
            routerLink: ['products'],
          },
          {
            label: 'Customers',
            icon: 'pi pi-spin pi-cog',
            routerLink: ['customers'],
          }
          ,
          {
            label: 'Create Product',
            icon: 'pi pi-database',
            routerLink: ['create-product'],
          }
        ]
      }
    ];
  }

}
