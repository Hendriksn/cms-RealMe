import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpServiceService} from "../services/http-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private location: Location, private router: Router, private httpService: HttpServiceService) { }

  myProfilePB : any;
  myProfileUsername : any;
  serverAdress : any = this.httpService.server;

  ngOnInit(): void {
    this.myProfilePB = localStorage.getItem("lastUserPB")
    this.myProfileUsername = localStorage.getItem("lastUserUsername")
  }

  loginbtnclicked(){
    this.router.navigate(["/login-other-user", {username: this.myProfileUsername}])
    this.location.go('/profile');
  }

  otheruserbtnclicked(){
    this.router.navigate(["/login-other-user"])
    this.location.go('/login');
  }

  forgotPassword(){
    this.router.navigate(["/login-other-user"])
    this.location.go('/login');
  }

  registerbtnclicked(){
    this.router.navigate(["/register-data"])
    this.location.go('/register-data');
  }


}
