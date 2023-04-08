import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import * as inspector from "inspector";

interface TokenPayload{
  role: string,
  name: string,
  sub: string,
  iat: number,
  exp: number
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  reset = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  }, {updateOn: 'submit'});

  invalidEmail = false;
  invalidPassword = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private toastr: ToastrService,
      private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  trueReset():any{
    this.router.navigate(["reset-password"]);
  }

  onLogin(): any{
    this.invalidEmail = !!this.loginForm.get('email')?.invalid;
    this.invalidPassword = !!this.loginForm.get('password')?.invalid;

    if (this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid){
      this.http.post('http://localhost:9000/api/auth/authenticate', this.loginForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              sessionStorage.setItem("Token", response.body.token);
              sessionStorage.setItem("NewToken", response.body.newToken);
              const decodedToken = jwt_decode(response.body.token) as TokenPayload;
              sessionStorage.setItem("name", decodedToken.name);
              sessionStorage.setItem("role", decodedToken.role);
              this.router.navigate(['home']);
            } else {
              this.toastr.error("No se puedo iniciar sesión");
            }
          },
          error => {
            this.toastr.error("No se puedo iniciar sesión");
          }
      );
    }
  }
}
