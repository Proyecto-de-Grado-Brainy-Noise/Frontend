import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon"
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BodyComponent } from './body/body.component';
import { UploadResonanceComponent } from './upload-resonance/upload-resonance.component';
import { HistoryComponent } from './history/history.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { FormsModule }   from '@angular/forms';
import { AllUsersComponent } from './all-users/all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {LoginComponent} from "./login/login.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import { PopUpComponent } from './pop-up/pop-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";
import { ShowFoundUserComponent } from './show-found-user/show-found-user.component';
import { TokenInterceptor } from "./interceptors/token.interceptor";
import {NgxUiLoaderModule} from "ngx-ui-loader";

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'new-password/:email', component: NewPasswordComponent },
  { path: 'home', component: BodyComponent, children: [
      { path: 'upload-resonance', component: UploadResonanceComponent },
      { path: 'admin/history', component: HistoryComponent },
      { path: 'admin/new-user', component: NewUserComponent },
      { path: 'admin/search-user', component: SearchUserComponent },
      { path: 'admin/users', component: AllUsersComponent },
      { path: 'admin/edit-user/:idEmployee', component: EditUserComponent },
      { path: 'admin/found-user/:idEmployee', component: ShowFoundUserComponent },
      { path: 'admin/found-user/:doctype/:document', component: ShowFoundUserComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    BodyComponent,
    UploadResonanceComponent,
    HistoryComponent,
    NewUserComponent,
    SearchUserComponent,
    AllUsersComponent,
    EditUserComponent,
    LoginComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    PopUpComponent,
    ShowFoundUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
