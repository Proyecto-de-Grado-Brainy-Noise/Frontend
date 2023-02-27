import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  showPopUp = false;
  users: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:9000/api/admin/listUsers', { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            this.users = Object.values(response.body.message);
          }
        },
        error => {
          console.log(error.error.message);
        }
    );
  }

  showDeletePopUp():void{
    this.showPopUp = true;
  }


}
