import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  checkboxChecked: boolean = false;

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
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['']
    }
  );

  submitForm() {
    if (this.signUpForm.valid && this.checkboxChecked) {
      this.authService.register(this.signUpForm.value);
    }
  }

  setRole(role: string): void {
    this.signUpForm.patchValue({
      role: role
    });
  }

  checkboxChange(event: any) {
    this.checkboxChecked = event.checked;
  }

  closeDialogBox() {
    this.closeDialog.emit();
  }
}
