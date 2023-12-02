import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpServiceService} from "../services/http-service.service";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  faComment = faComment;
  selected = 0;
  hovered = 0;
  readonly = false;
  username: string | null = 'unknown';
  profile : any;
  follower : any;
  followI : any
  pictures : any
  myProfile : any
  checkFollow : any
  serverAdress : any = this.httpService.server
  ratingcontrol = new FormControl(0);
  private _pictureID: any;
  rateScore: any = 0;
  private rateResponse: any;


  constructor(private location: Location, private router: Router, private route: ActivatedRoute,
              private httpService: HttpServiceService,  private  modalService: NgbModal) { }

  ngOnInit(): void {
    this.httpService.checkAuth();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.username = paramMap.get("username");
      this.httpService.getMyProfile().subscribe(
        (response) => { console.log(response) ;this.myProfile = response;
          this.httpService.getProfile(this.username).subscribe(
            (response) => {console.log(response); this.profile = response;
              this.httpService.checkFollow(this.myProfile.id, this.profile[0].id).subscribe(
                (response) => {this.checkFollow = response; console.log(response)},
                (error) => { console.log(error); });
              this.httpService.getProfileFollows(this.profile[0].id).subscribe(
                (response) => {this.follower = response; },
                (error) => { console.log(error); });
              this.httpService.getProfileFollowI(this.profile[0].id).subscribe(
                (response) => {this.followI = response; },
                (error) => { console.log(error); });
              this.httpService.getProfilePictures(this.profile[0].id).subscribe(
                (response) => {console.log(response);this.pictures = response; this.calcRating()},
                (error) => { console.log(error); });});

        },
        (error) => { console.log(error); });
    });
  }

  calcRating() {
    let evalCounter = 0
    let evalSum:number = 0
    this.pictures.data.forEach((picture: { "": any; }) => {
      // @ts-ignore
      picture.attributes.evaluations.data.forEach((evaluation: { "": any; }) => {
        evalCounter++;
        // @ts-ignore
        evalSum = evalSum + parseInt(evaluation.attributes.points)
      })
    })
    console.log("RatingCount: "+ evalCounter)
    console.log("RatingSum: ", evalSum)
    console.log("RatingScore:", evalSum/evalCounter)
    if (evalCounter != 0) this.rateScore = evalSum/evalCounter

  }

  clickedOnFollower(id : any){
    this.router.navigate(["/follower/"+ id])
    this.location.go('/follower/'+id);
  }
  clickedOnFolgeIch(id : any){
    this.router.navigate(["/folgeich/"+ id])
    this.location.go('/folgeich/'+id);
  }
  clickedComment(pictureID: any){
    this._pictureID = pictureID;
    this.router.navigate(["/comments/"+pictureID])
    this.location.go('/comments'+pictureID);
  }

  sendFollow(profileID : any) {
    this.httpService.setFollow(this.myProfile.id, profileID)
      .subscribe((response) => {console.log(response);
        //window.location.reload();
        this.ngOnInit();
        }, (error) => { console.log(error);});
  }

  sendDeFollow(followID : any) {
    console.log(followID)
    this.httpService.deleteFollow(followID).subscribe((response) => {console.log(response);
      //window.location.reload();
      this.ngOnInit();
      }, (error) => { console.log(error);});
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
            (response) => {(console.log(response)); this.ngOnInit()},
            (error: any) => (console.log(error))
          )
        } else {
          this.httpService.updateRate(picID, this.myProfile.id, this.ratingcontrol.value, this.rateResponse).subscribe(
            (response) => {(console.log(response)); this.ngOnInit()},
            (error) => (console.log(error))
          )
        }},
      (error: any) => { console.log(error);}
    );
  }

}
