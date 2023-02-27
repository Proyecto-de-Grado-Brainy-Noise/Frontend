import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    name2: ['', []],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    lastname2: ['', []],
    birthdate: ['', [Validators.required]],
    doctype: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(7)]],
    email: ['', [Validators.required, Validators.email]],
    idEmployee: ['', [Validators.required, Validators.minLength(5)]],
    jobtitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    role: ['', [Validators.required]],
    observations: ['', []],
  }, {updateOn: 'submit'});

  invalidFirstname = false;
  invalidLastname1 = false;
  invalidBirthdate = false;
  invalidDoctype = false;
  invalidDocnumber = false;
  invalidEmail = false;
  invalidIdemployee = false;
  invalidJobtitle = false;
  invalidArea = false;
  invalidRole = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("birthdate")).setAttribute("max", new Date().toISOString().split("T")[0]);
  }

  onNewUser() {
    this.invalidFirstname = !!this.newUserForm.get('name')?.invalid;
    this.invalidLastname1 = !!this.newUserForm.get('lastname')?.invalid;
    this.invalidBirthdate = !!this.newUserForm.get('birthdate')?.invalid;
    this.invalidDoctype = !!this.newUserForm.get('doctype')?.invalid;
    this.invalidDocnumber = !!this.newUserForm.get('document')?.invalid;
    this.invalidEmail = !!this.newUserForm.get('email')?.invalid;
    this.invalidIdemployee = !!this.newUserForm.get('idEmployee')?.invalid;
    this.invalidJobtitle = !!this.newUserForm.get('jobtitle')?.invalid;
    this.invalidArea = !!this.newUserForm.get('area')?.invalid;
    this.invalidRole = !!this.newUserForm.get('role')?.invalid;

    if(!this.invalidFirstname && !this.invalidLastname1 && !this.invalidBirthdate && !this.invalidDocnumber && !this.invalidDoctype && !this.invalidEmail && !this.invalidIdemployee && !this.invalidJobtitle && !this.invalidArea && !this.invalidRole){
      this.http.post('http://localhost:9000/api/admin/saveUser', this.newUserForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.toastr.success(response.body.message);
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
