import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  resetForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    confirmEmail: ['', [Validators.required, Validators.email]]
  }, {updateOn: 'submit'});

  invalidEmail = false;
  invalidConfirmEmail = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  onSend(): any{
    this.invalidEmail = !!this.resetForm.get('email')?.invalid;
    this.invalidConfirmEmail = !!this.resetForm.get('confirmEmail')?.invalid;

    if (this.resetForm.get('email')?.valid && this.resetForm.get('confirmEmail')?.valid){

    }
    console.log(this.resetForm.value);
  }
}
