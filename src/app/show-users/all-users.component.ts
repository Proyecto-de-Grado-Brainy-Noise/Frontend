import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  showPopUp = false;
  users: any[] = [];
  idDelete : any;
  constructor(
      private http: HttpClient,
      private toastr: ToastrService,
      private router: Router,
  ) { }

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

  showDeletePopUp(idEmployee : any):void{
    this.showPopUp = true;
    this.idDelete = idEmployee;
  }

  receiveDenial({$event}: { $event: any }){
      this.showPopUp = $event;
  }

  receiveAcceptance({$event}: { $event: any }){
      if($event){
          let request = {
            "idEmployee" : this.idDelete
          };

          this.http.post('http://localhost:9000/api/admin/deleteUser', request, { observe: 'response' }).subscribe(
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
