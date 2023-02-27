import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  reset = false;
  logged = false;

  @Output() loggedEvent = new EventEmitter<boolean>();
  @Output() resetEvent = new EventEmitter<boolean>();

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  }, {updateOn: 'submit'});

  invalidEmail = false;
  invalidPassword = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  trueReset():any{
    this.reset = true;
    this.resetEvent.emit(this.reset);
  }

  onLogin(): any{
    this.invalidEmail = !!this.loginForm.get('email')?.invalid;
    this.invalidPassword = !!this.loginForm.get('password')?.invalid;

    if (this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid){
      this.logged = true;
      this.loggedEvent.emit(this.logged);
    }
  }
}
