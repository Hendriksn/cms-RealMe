import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { faUser, faComment, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faTrash = faTrash
  faComment = faComment;
  faMagnifyingGlass = faMagnifyingGlass;
  isCollapsed: boolean;

  constructor(private location: Location, private router: Router) {
    this.isCollapsed = true
  }
  ngOnInit(): void {
  }
  topicturelistforyou(){
    this.router.navigate(["/picture-list-foryou"])
    this.location.go("picture-list-foryou")
  }
  todiscovery() {
    this.router.navigate([""]);
    this.location.go("discovery");
  }
    toprofileforme(){
    this.router.navigate(["/profile-forme"])
    this.location.go('/profile-forme');
  }
}

