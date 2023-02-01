import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
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
    private router: Router
    ) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("birthdate")).setAttribute("max", new Date().toISOString().split("T")[0]);
  }

  onSubmit(data: any) {
    console.log(data);
    this.router.navigate(['/admin/users']);
  } 
}