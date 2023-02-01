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
import { NewUserComponent } from './new-user/new-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { FormsModule }   from '@angular/forms';
import { AllUsersComponent } from './all-users/all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: 'admin/upload-resonance', component: UploadResonanceComponent },
  { path: 'admin/history', component: HistoryComponent },
  { path: 'admin/new-user', component: NewUserComponent },
  { path: 'admin/search-user', component: SearchUserComponent },
  { path: 'admin/users', component: AllUsersComponent },
  { path: 'admin/edit-user/:idemployee', component: EditUserComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    DashboardComponent,
    BodyComponent,
    UploadResonanceComponent,
    HistoryComponent,
    NewUserComponent,
    SearchUserComponent,
    AllUsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
