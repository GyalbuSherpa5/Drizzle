import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../State/Auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @Input() changeTemplate: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  loginForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  );

  submitForm(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }
}
