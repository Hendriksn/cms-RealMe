import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PictureListForyouComponent} from './picture-list-foryou/picture-list-foryou.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {CommentsComponent} from './comments/comments.component';
import {LoginComponent} from './login/login.component';
import {FollowerComponent} from './follower/follower.component';
import {LoginOtherUserComponent} from './login-other-user/login-other-user.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {RegisterDataComponent} from './register-data/register-data.component';
import {RouterModule, Routes} from "@angular/router";
import {buildServePath} from "@angular-devkit/build-angular/src/webpack/configs";
import { FolgeichComponent } from './folgeich/folgeich.component';
import { ProfileFormeComponent } from './profile-forme/profile-forme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {LogPipe} from "./helper/logPipe";
import { UpdateUserComponent } from './update-user/update-user.component';
import { HeaderComponent } from './header/header.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { UploadProfilePictureComponent } from './upload-profile-picture/upload-profile-picture.component';




const appRoutes: Routes = [
  {path: "", component: LandingPageComponent},
  {path: "login", component: LoginComponent},
  {path: "profile/:username", component: ProfilComponent},
  {path: "comments/:picID", component: CommentsComponent},
  {path: "login", component: LoginComponent},
  {path: "login-other-user", component: LoginOtherUserComponent},
  {path: "picture-list-foryou", component: PictureListForyouComponent},
  {path: "register", component: RegisterComponent},
  {path: "register-data", component: RegisterDataComponent},
  {path: "folgeich/:id", component: FolgeichComponent},
  {path: "follower/:id", component: FollowerComponent},
  {path: "profile-forme", component: ProfileFormeComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    PictureListForyouComponent,
    LandingPageComponent,
    CommentsComponent,
    LoginComponent,
    FollowerComponent,
    FolgeichComponent,
    LoginOtherUserComponent,
    RegisterComponent,
    ProfilComponent,
    RegisterDataComponent,
    FolgeichComponent,
    ProfileFormeComponent,
    LogPipe,
    UpdateUserComponent,
    HeaderComponent,
    UploadPictureComponent,
    UploadProfilePictureComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
      ToastrModule.forRoot(), // ToastrModule added
      BrowserAnimationsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
