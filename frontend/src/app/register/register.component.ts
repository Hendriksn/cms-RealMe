import { Component, OnInit } from '@angular/core';
import{Router} from "@angular/router"
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  loginbtnclicked(){
    this.router.navigate(["login-other-user"])
    this.location.go('/login-other-user');
  }

  registrierbtnclicked(){
    this.router.navigate(["register-data"])
    this.location.go('/register-data');
  }


}
