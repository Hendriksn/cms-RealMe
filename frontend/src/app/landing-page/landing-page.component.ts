import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpServiceService} from "../services/http-service.service";
import {faComment, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, DoCheck {
  faComment = faComment;
  faMagnifyingGlass = faMagnifyingGlass;
  isCollapsed: boolean;
  ratingcontrol = new FormControl(0);
  private rateResponse: any;



  constructor(private location: Location, private router: Router, private httpService: HttpServiceService) {
    this.isCollapsed = true
  }

  pictures: any
  allProfilePictures: any
  private _pictureID: any;
  serverAdress: any = this.httpService.server
  selected = 0;
  hovered = 0;
  readonly = false;
  myProfile: any



  ngOnInit(): void {
   this.httpService.checkLoggedIn();
    this.httpService.getMyProfile().subscribe(
      (response) => { console.log(response) ;this.myProfile = response;})
    this.httpService.getPictures().subscribe(
      (response) => {console.log(response);this.pictures = response; },
      (error) => { console.log(error); });
    this.httpService.getAllProfilePictures().subscribe(
      (response) => { console.log(response); this.allProfilePictures = response;});


    // @ts-ignore
    let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-gray")
    btnformyou.classList.add("button-orange")
    btndiscovery.classList.remove("button-orange")
    btndiscovery.classList.add("button-gray")
    btnuser.classList.remove("button-gray")
    btnuser.classList.add("button-orange")
  }

  ngDoCheck(): void {
    // @ts-ignore
    let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-gray")
    btnformyou.classList.add("button-orange")
    btndiscovery.classList.remove("button-orange")
    btndiscovery.classList.add("button-gray")
    btnuser.classList.remove("button-gray")
    btnuser.classList.add("button-orange")
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


  toprofile(id: any) {
    this.router.navigate(["/profile/" + id])
    this.location.go('/profile/' + id);
  }

  clickedComment(pictureID: any) {
    this._pictureID = pictureID;
    this.router.navigate(["/comments/" + pictureID])
    this.location.go('/comments' + pictureID);
  }
}
