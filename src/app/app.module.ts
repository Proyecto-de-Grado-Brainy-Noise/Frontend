import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { UploadResonanceComponent } from './upload-resonance/upload-resonance.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: 'admin/upload-resonance', component: UploadResonanceComponent },
  { path: 'admin/history', component: HistoryComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    DashboardComponent,
    BodyComponent,
    UploadResonanceComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
