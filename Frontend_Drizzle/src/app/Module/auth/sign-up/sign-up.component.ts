import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../State/Auth/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Input() changeTemplate: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  signUpForm: FormGroup = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  );

  submitForm() {
    if (this.signUpForm.valid) {
      this.authService.register(this.signUpForm.value);
    }
  }
}
