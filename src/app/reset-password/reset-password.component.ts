import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  @Output() resetEvent = new EventEmitter<boolean>();

  reset = true;

  resetForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    confirmEmail: ['', [Validators.required, Validators.email]]
  }, {updateOn: 'submit'});

  invalidEmail = false;
  invalidConfirmEmail = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  onSend(): any{
    this.invalidEmail = !!this.resetForm.get('email')?.invalid;
    this.invalidConfirmEmail = !!this.resetForm.get('confirmEmail')?.invalid;
    if (this.resetForm.get('email')?.valid && this.resetForm.get('confirmEmail')?.valid){
      this.http.post('http://localhost:9000/api/reset-password', this.resetForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.toastr.success(response.body.message);
              this.reset = true;
              this.resetEvent.emit(this.reset);
            } else {
              this.toastr.error(response.body.message);
            }
          },
          error => {
            this.toastr.error(error);
          }
      );
    }
  }
}
