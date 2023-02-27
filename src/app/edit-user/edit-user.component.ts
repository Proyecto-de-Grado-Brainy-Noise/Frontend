import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    middlename: ['', []],
    lastname1: ['', [Validators.required, Validators.minLength(3)]],
    lastname2: ['', []],
    birthdate: ['', [Validators.required]],
    doctype: ['', [Validators.required]],
    docnumber: ['', [Validators.required, Validators.minLength(7)]],
    email: ['', [Validators.required, Validators.email]],
    idemployee: ['', [Validators.required, Validators.minLength(5)]],
    jobtitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    observations: ['', []],
  }, {updateOn: 'submit'});

  user = {
    firstname: 'John',
    middlename: '',
    lastname1: 'Doe',
    lastname2: '',
    birthdate: '1990-01-01',
    doctype: '1',
    docnumber: '1234567890',
    email: 'john@mail.com',
    idemployee: 1,
    jobtitle: '1',
    area: '1',
    observations: 'ok',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("birthdate")).setAttribute("max", new Date().toISOString().split("T")[0]);
  }

  onEdit() {
    this.router.navigate(['/admin/users']);
  } 
}