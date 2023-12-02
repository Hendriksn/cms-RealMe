import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpServiceService} from "../services/http-service.service";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-folgeich',
  templateUrl: './folgeich.component.html',
  styleUrls: ['./folgeich.component.scss']
})
export class FolgeichComponent implements OnInit {

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private httpService: HttpServiceService) { }
  myProfile : any;
  follower : any;
  serverAdress : any = this.httpService.server;
  faUser = faUser;
  id: string | null = 'unknown';

  ngOnInit() {
    this.httpService.checkAuth();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get("id");
      this.httpService.getMyProfile().subscribe(
        (response) => {
          console.log(response);
          this.myProfile = response;
          this.httpService.getProfileFollowI(this.id).subscribe(
            (response) => {
              this.follower = response;
              console.log(response);
            },
            (error) => {
              console.log(error);
            });
        },
        (error) => {
          console.log(error);
        });
    })
  }
  topicturelistforyou(){
    this.router.navigate(["/picture-list-foryou"])
    this.location.go("picture-list-foryou")
  }
  profilebtnclicked(){
    this.router.navigate(["/profile-forme"])
    this.location.go('/profile-forme');
  }
}
