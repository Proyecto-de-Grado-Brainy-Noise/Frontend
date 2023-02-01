import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
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
