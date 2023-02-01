import { Component } from '@angular/core';

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
  }

  receiveReset({$event}: { $event: any }){
    this.reset = $event;
  }
}
