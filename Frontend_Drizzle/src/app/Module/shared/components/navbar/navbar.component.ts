import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthComponent} from "../../../auth/auth.component";
import {UserService} from "../../../../State/User/user.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../Models/AppState";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentSection: any;
  isNavbarContentOpen: any;
  userProfile: any;

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
      this.store.pipe(select((store) => store.user))
        .subscribe((user) => {
          this.userProfile = user.userProfile;

          if(user.userProfile){
            this.dialog.closeAll();
          }
        })
    }
  }

  openNavbarContent(section: string) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }

  navigateTo(path: string) {
    this.router.navigate([path]).then(value => console.log("route success"));
  }

  @HostListener('document:click', [`$event`])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector(".modal-container");
    const openButtons = document.querySelectorAll(".open-button");

    let clickInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }
    })

    if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }

  handleOpenLoginModel() {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false
    })
  }
}
