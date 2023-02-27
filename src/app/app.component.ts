import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder} from "@angular/forms";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Brainy Noise';

  constructor(
      private route: ActivatedRoute,
      private router: Router
  ) { }

  isSideNavCollapsed = false;
  screenWidth = 0;
  logged = true;
  reset = false;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  receiveLogin({$event}: { $event: any }){
    this.logged = $event;
    this.router.navigate(['upload-resonance']);
  }

  receiveLogout({$event}: { $event: any }){
    this.logged = $event;
  }

  receiveReset({$event}: { $event: any }){
    this.reset = $event;
  }
}
