import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {UserService} from "./State/User/user.service";
import {AppState} from "./Models/AppState";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend_Drizzle';

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem("jwt")) {
      this.userService.getUserProfile();
      this.store.pipe(select((store) => store.auth))
        .subscribe((user) => {
          this.userService.getUserProfile();
        })
    }
  }
}
