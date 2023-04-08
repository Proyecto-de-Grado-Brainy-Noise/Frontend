import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
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
    private http: HttpClient
  ) {  }

  ngOnInit(): void {
  }

  onSearchID () {
    let request = {
      "idEmployee" : this.searchIDForm.value.idEmployee
    };

    this.http.post('http://localhost:9000/api/admin/searchUser', request, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            let path = "admin/found-user/"+this.searchIDForm.value.idEmployee;
            this.router.navigate([path]);
          } else {
          }
        },
        error => {

        }
    );
  }

  onSearchDocument () {
    this.router.navigate(['/admin/users']);
  }
}
