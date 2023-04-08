import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{
  logged = false;
  @Output() loggedEvent = new EventEmitter<boolean>();

  newPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {updateOn: 'submit'});

  invalidPassword = false;
  invalidConfirmPassword = false;

  constructor(private formBuilder: FormBuilder) {
    console.log("Entre");
  }

  ngOnInit(): void {
    console.log("Entre");
    this.logged = true;
    this.loggedEvent.emit(this.logged);
  }

  onUpdate(): any{
    this.invalidPassword = !!this.newPasswordForm.get('password')?.invalid;
    this.invalidConfirmPassword = !!this.newPasswordForm.get('confirmPassword')?.invalid;

    if (this.newPasswordForm.get('password')?.valid && this.newPasswordForm.get('confirmPassword')?.valid){

    }
    console.log(this.newPasswordForm.value);
  }
}
