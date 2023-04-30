import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{
  email = this.route.snapshot.paramMap.get('email');

  newPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {updateOn: 'submit'});

  invalidPassword = false;
  invalidConfirmPassword = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private http: HttpClient,
      private toastr: ToastrService,
      private router: Router
  ) {}

  ngOnInit(): void {
  }

  onUpdate(): any{
    this.invalidPassword = !!this.newPasswordForm.get('password')?.invalid;
    this.invalidConfirmPassword = !!this.newPasswordForm.get('confirmPassword')?.invalid;

    if (this.newPasswordForm.get('password')?.valid && this.newPasswordForm.get('confirmPassword')?.valid){
      let request = {
        "email" : this.email,
        "password" : this.newPasswordForm.get('password')?.value
      };
      this.http.post('http://127.0.0.1:9000/api/respwd', request, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.toastr.success(response.body.message);
              this.router.navigate(["login"]);
            } else {
              this.toastr.error(response.body.message);
            }
          },
          error => {
            this.toastr.error(error.error.message);
          }
      );
    }
  }
}
