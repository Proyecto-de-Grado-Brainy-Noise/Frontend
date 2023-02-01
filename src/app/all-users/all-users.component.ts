import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any = [
    {idemployee: 1, name: 'John', email: 'john@mail.com'},
    {idemployee: 2, name: 'Jane', email: 'jane@mail.com'},
    {idemployee: 3, name: 'Bob', email: 'bob@mail.com'},
    {idemployee: 4, name: 'Alice', email: 'alice@mail.com'},
    {idemployee: 5, name: 'Tom', email: 'tom@mail.com'}
  ];

  ngOnInit(): void {
    console.log(this.users);
  }

}
