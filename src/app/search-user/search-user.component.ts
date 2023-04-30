import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchIDForm: FormGroup = this.formBuilder.group({
    idEmployee: ['', [Validators.required]]
  }, {updateOn: 'submit'});

  searchDocumentForm: FormGroup = this.formBuilder.group({
    doctype: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(7)]]
  }, {updateOn: 'submit'});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
  }

  onSearchID () {
    let request = {
      "idEmployee" : this.searchIDForm.value.idEmployee
    };

    this.http.post('http://api-gateway:9000/api/admin/searchUser', request, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            if (response.body.message[0] != null){
              let path = "/home/admin/found-user/"+this.searchIDForm.value.idEmployee;
              this.router.navigate([path]);
            } else {
              this.toastr.error("No se encontró el usuario con ID " + this.searchIDForm.value.idEmployee);
            }
          } else {
            this.toastr.error(response.body.message);
          }
        },
        error => {

        }
    );
  }

  onSearchDocument () {

    let request = {
      "document" : this.searchDocumentForm.value.document,
      "doctype" : this.searchDocumentForm.value.doctype
    };

    this.http.post('http://api-gateway:9000/api/admin/searchUser', request, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            if (response.body.message[0] != null){
              let path = "/home/admin/found-user/"+this.searchDocumentForm.value.doctype+"/"+this.searchDocumentForm.value.document;
              this.router.navigate([path]);
            } else {
              this.toastr.error("No se encontró el usuario con documento " + this.searchDocumentForm.value.document);
            }
          } else {
            this.toastr.error("No se encontró el usuario con documento " + this.searchDocumentForm.value.document);
          }
        },
        error => {
          this.toastr.error("No se encontró el usuario con documento " + this.searchDocumentForm.value.document);
        }
    );
  }
}
