import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  showPopUp = false;
  isOrdered = false;
  users: any[] = [];
  userDelete : any;
  constructor(
      private http: HttpClient,
      private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:9000/api/admin/listUsers', { observe: 'response' }).subscribe(
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

  sortColumn(column: string) {
      this.users.sort((a, b) => {
          if (a[column] > b[column]) {
              return this.isOrdered ? -1 : 1;
          } else if (a[column] < b[column]) {
              return this.isOrdered ? 1 : -1;
          } else {
              return 0;
          }
      });

      this.isOrdered = !this.isOrdered;
  }

  showDeletePopUp(user : any):void{
    this.showPopUp = true;
    this.userDelete = user;
  }

  receiveDenial({$event}: { $event: any }){
      this.showPopUp = $event;
  }

  receiveAcceptance({$event}: { $event: any }){
      if($event){

          this.http.post('http://127.0.0.1:9000/api/admin/deleteUser', this.userDelete, { observe: 'response' }).subscribe(
              (response: HttpResponse<any>) => {
                  if (response.status == 200){
                      this.showPopUp = false;
                      this.toastr.success("Se ha eliminado exitosamente");
                      this.ngOnInit();
                  } else {
                      this.showPopUp = false;
                      this.toastr.error(response.body.message);
                  }
              },
              error => {
                  this.showPopUp = false;
                  this.toastr.error(error.error.message);
              }
          );
      }
  }
}
