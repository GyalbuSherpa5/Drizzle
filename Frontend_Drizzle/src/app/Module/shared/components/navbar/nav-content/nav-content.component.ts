import {Component, Input} from '@angular/core';
import {navigation} from "./nav-content";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {
  category: any;
  @Input() selectedSection: any;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.category = navigation;
  }

  handleNavigate = (path: any) => {
    this.router.navigate([path]).then(() => console.log("route success"));
  }
}
