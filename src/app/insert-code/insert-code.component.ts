import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insert-code',
  templateUrl: './insert-code.component.html',
  styleUrls: ['./insert-code.component.css']
})
export class InsertCodeComponent {
  codeForm: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required]],
  }, {updateOn: 'submit'});

  invalidCode:boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private toastr: ToastrService,
      private router: Router
  ) {}

  onCheck(){
    this.invalidCode = !!this.codeForm.get('code')?.invalid;
    if (this.codeForm.get('code')?.valid){
      this.http.post('http://127.0.0.1:9000/api/checkcode', this.codeForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.toastr.success(response.body.message);
              this.router.navigate(["new-password"])
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
