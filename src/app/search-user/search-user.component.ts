import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchIDForm: FormGroup = this.formBuilder.group({
    idemployee: ['', [Validators.required]]
  }, {updateOn: 'submit'});

  searchDocumentForm: FormGroup = this.formBuilder.group({
    doctype: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(7)]]
  }, {updateOn: 'submit'});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
  }

  onSearchID () {
    this.router.navigate(['/admin/users']);
  }

  onSearchDocument () {
    this.router.navigate(['/admin/users']);
  }
}
