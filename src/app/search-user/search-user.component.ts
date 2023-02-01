import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
  }

  onSubmit (data: any) {
    console.log(data);
    this.router.navigate(['/admin/users']);
  } 
}
