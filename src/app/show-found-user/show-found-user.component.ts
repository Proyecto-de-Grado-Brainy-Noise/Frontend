import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-show-found-user',
  templateUrl: './show-found-user.component.html',
  styleUrls: ['./show-found-user.component.css']
})
export class ShowFoundUserComponent implements OnInit{
  idEmployee = this.route.snapshot.paramMap.get('idEmployee');
  doctype = this.route.snapshot.paramMap.get('doctype');
  document = this.route.snapshot.paramMap.get('document');
  showPopUp = false;

  request = {
    "idEmployee" : this.idEmployee,
    "document" : this.document,
    "doctype" : this.doctype
  };

  user : any;

  invalidFirstname = false;
  invalidLastname1 = false;
  invalidBirthdate = false;
  invalidDoctype = false;
  invalidDocnumber = false;
  invalidEmail = false;
  invalidIdemployee = false;
  invalidJobtitle = false;
  invalidArea = false;
  invalidRole = false;

  editUserForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    name2: ['', []],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    lastname2: ['', []],
    birthdate: ['', [Validators.required]],
    doctype: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(7)]],
    email: ['', [Validators.required, Validators.email]],
    idEmployee: ['', [Validators.required, Validators.minLength(5)]],
    jobtitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    role: ['', [Validators.required]],
    observations: ['', []],
  }, {updateOn: 'submit'});

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.http.post('http://localhost:9000/api/admin/searchUser', this.request, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200){
            this.user = Object.values(response.body.message[0]);
            this.editUserForm.get("name")?.setValue(this.user[2]);
            this.editUserForm.get("name2")?.setValue(this.user[3]);
            this.editUserForm.get("lastname")?.setValue(this.user[4]);
            this.editUserForm.get("lastname2")?.setValue(this.user[5]);
            this.editUserForm.get("birthdate")?.setValue(this.user[8]);
            this.editUserForm.get("document")?.setValue(this.user[7]);
            this.editUserForm.get("email")?.setValue(this.user[0]);
            this.editUserForm.get("idEmployee")?.setValue(this.user[9]);
            this.editUserForm.get("jobtitle")?.setValue(this.user[10]);
            this.editUserForm.get("area")?.setValue(this.user[11]);
            this.editUserForm.get("role")?.setValue(this.user[1]);
            this.editUserForm.get("observations")?.setValue(this.user[12]);

            if(this.user[6]==1){
              this.editUserForm.get("doctype")?.setValue("Cédula de ciudadanía");
            } else if(this.user[6]==2){
              this.editUserForm.get("doctype")?.setValue("Cédula de extranjería");
            } else {
              this.editUserForm.get("doctype")?.setValue("Pasaport");
            }
          }
        },
        error => {
          console.log(error.status);
        }
    );
    (<HTMLInputElement>document.getElementById("birthdate")).setAttribute("max", new Date().toISOString().split("T")[0]);
  }

  showDeletePopUp():void{
    this.showPopUp = true;
  }

  receiveDenial({$event}: { $event: any }){
    this.showPopUp = $event;
  }

  receiveAcceptance({$event}: { $event: any }){
    if($event){
      let request = {
        "idEmployee" : this.idEmployee
      };

      this.http.post('http://localhost:9000/api/admin/deleteUser', this.editUserForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.showPopUp = false;
              this.toastr.success("Se ha eliminado exitosamente");
              this.router.navigate(["home/admin/users"]);
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

  onEdit() {
    this.invalidFirstname = !!this.editUserForm.get('name')?.invalid;
    this.invalidLastname1 = !!this.editUserForm.get('lastname')?.invalid;
    this.invalidBirthdate = !!this.editUserForm.get('birthdate')?.invalid;
    this.invalidDoctype = !!this.editUserForm.get('doctype')?.invalid;
    this.invalidDocnumber = !!this.editUserForm.get('document')?.invalid;
    this.invalidEmail = !!this.editUserForm.get('email')?.invalid;
    this.invalidIdemployee = !!this.editUserForm.get('idEmployee')?.invalid;
    this.invalidJobtitle = !!this.editUserForm.get('jobtitle')?.invalid;
    this.invalidArea = !!this.editUserForm.get('area')?.invalid;
    this.invalidRole = !!this.editUserForm.get('role')?.invalid;

    if(!this.invalidFirstname && !this.invalidLastname1 && !this.invalidBirthdate && !this.invalidDocnumber && !this.invalidDoctype && !this.invalidEmail && !this.invalidIdemployee && !this.invalidJobtitle && !this.invalidArea && !this.invalidRole){
      this.http.post('http://localhost:9000/api/admin/updateUser', this.editUserForm.value, { observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status == 200){
              this.toastr.success(response.body.message);
              this.router.navigate(["home/admin/users"]);
            } else {
              this.toastr.error(response.body.message);
            }
          },
          error => {
            this.toastr.error(error.error.message);
          }
      );
    }
  }
}
