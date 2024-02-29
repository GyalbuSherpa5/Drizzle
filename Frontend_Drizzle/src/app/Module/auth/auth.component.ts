import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoggedIn = true;

  constructor(private dialogRef: MatDialogRef<AuthComponent>) { }

  toggleTemplate = () => {
    this.isLoggedIn = !this.isLoggedIn;
  }

  closeDialogBox() {
    this.dialogRef.close();
  }
}
