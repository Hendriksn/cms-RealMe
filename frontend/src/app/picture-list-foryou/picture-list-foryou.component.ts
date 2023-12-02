import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {faMagnifyingGlass, faComment} from "@fortawesome/free-solid-svg-icons";
import {HttpServiceService} from "../services/http-service.service";
import {HeaderComponent} from "../header/header.component";
import {FormControl} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-picture-list-foryou',
  templateUrl: './picture-list-foryou.component.html',
  styleUrls: ['./picture-list-foryou.component.scss']
})
export class PictureListForyouComponent implements OnInit, DoCheck {
  faComment = faComment;
  faMagnifyingGlass = faMagnifyingGlass
  private _pictureID: any;
  selected = 0;
  hovered = 0;
  readonly = false;
  isCollapsed: boolean;
  ratingcontrol = new FormControl(0);
  myProfile: any
  private followI: any;
  private usersIfollow: any;
  private rateResponse: any;


  constructor(private location: Location, private router: Router, private httpService: HttpServiceService) {
    this.isCollapsed = true
  }

  pictures: any
  allProfilePictures: any
  serverAdress: any = this.httpService.server
  arr = [];

  ngOnInit(): void {
    this.httpService.checkAuth();
    this.httpService.getMyProfile().subscribe(
      (response) => { console.log(response) ;this.myProfile = response;
        this.httpService.getProfileFollowI(this.myProfile.id).subscribe(
          (response) => {this.followI = response; this.searchUsersIfollow(); console.log(this.arr); this.httpService.getArrPictures(this.arr).subscribe(
            (response) => {
              console.log(response);
              this.pictures = response;
            },
            (error) => {
              console.log(error);
            });},
          (error) => { console.log(error); });
      })

    // @ts-ignore
    let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-orange")
    btnformyou.classList.add("button-gray")
    btndiscovery.classList.remove("button-gray")
    btndiscovery.classList.add("button-orange")
    btnuser.classList.remove("button-gray")
    btnuser.classList.add("button-orange")
  }

  ngDoCheck():void {
      // @ts-ignore
      let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-orange")
    btnformyou.classList.add("button-gray")
    btndiscovery.classList.remove("button-gray")
    btndiscovery.classList.add("button-orange")
    btnuser.classList.remove("button-gray")
    btnuser.classList.add("button-orange")
  }

  searchUsersIfollow() {
    this.followI.data.forEach((follows: { "": any; }) => {
      // @ts-ignore
      console.log(follows.attributes.follow_in.data.id)
      // @ts-ignore
      this.arr.push(follows.attributes.follow_in.data.id)
    });
  }

  clickedComment(pictureID: any) {
    this._pictureID = pictureID;
    this.router.navigate(["/comments/" + pictureID])
    this.location.go('/comments' + pictureID);
  }

  toprofile(id: any) {
    this.router.navigate(["/profile/" + id])
    this.location.go('/profile/' + id);
  }

  clickRating(picID: any) {
    console.log(this.ratingcontrol.value)
    // @ts-ignore
    this.httpService.setRate(picID, this.myProfile.id).subscribe(
      // @ts-ignore
      (response) => {console.log(response); this.rateResponse = response
        // @ts-ignore
        console.log(response.meta.pagination.total)
        // @ts-ignore
        if (response.meta.pagination.total < 1) {
          this.httpService.createRate(picID, this.myProfile.id, this.ratingcontrol.value).subscribe(
            (response) => (console.log(response)),
                (error: any) => (console.log(error))
            )
        } else {
          this.httpService.updateRate(picID, this.myProfile.id, this.ratingcontrol.value, this.rateResponse).subscribe(
            (response) => (console.log(response)),
            (error) => (console.log(error))
          )
        }},
      (error: any) => { console.log(error);}
    );
  }



}
