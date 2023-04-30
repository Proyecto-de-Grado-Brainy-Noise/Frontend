import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AuthorizationService} from "../authorization.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  name = "";

  ngOnInit(): void {
    this.name = sessionStorage.getItem("name")!;
  }

  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private toastr: ToastrService,
      private authorizationService: AuthorizationService
  ) { }

  onClose() {
    let request = {
      "email" : sessionStorage.getItem("sub")!
    };
    this.http.post('http://127.0.0.1:9000/api/auth/logout', request, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            sessionStorage.setItem("Token", "");
            sessionStorage.setItem("NewToken", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("role", "");
            sessionStorage.setItem("sub", "");
            this.authorizationService.logout();
            this.router.navigate(['']);
          } else {
            this.toastr.error("Error al cerrar sesión");
          }
        },
        error => {
          this.toastr.error("Error al cerrar sesión");
        }
    );
  }

}
