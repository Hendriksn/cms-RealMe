import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {HttpServiceService} from "../services/http-service.service";
import { faUser } from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  send = faPaperPlane;
  picID: string | null = '';
  comments : any
  allProfilePictures : any
  serverAdress : any = this.httpService.server
  picture : any
  faUser = faUser
  commentText: any = ""
  myProfile : any
  userID: any = 1


  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private httpService: HttpServiceService) { }

  ngOnInit(): void {
    //this.httpService.setComment();


    this.httpService.checkAuth();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.picID = paramMap.get("picID");
    this.httpService.getComments(this.picID).subscribe(
      (response) => {console.log(response);this.comments = response; },
      (error) => { console.log(error); });
    //getProfilePictures
      this.httpService.getAllProfilePictures().subscribe(
        (response) => { console.log(response); this.allProfilePictures = response;});
      this.httpService.getPicture(this.picID).subscribe(
        (response) => { console.log(response); this.picture = response;});
      this.httpService.getMyProfile().subscribe(
        (response) => { console.log(response);
          this.myProfile = response;
        });




    })
  }

  sendComment() {
    // @ts-ignore

    console.log(this.commentText)
    this.httpService.setComment(this.myProfile.id, this.picID, this.commentText).subscribe((response) => {console.log(response);
      //window.location.reload();
      this.ngOnInit();
      this.commentText = "";

      }, (error) => { console.log(error);});

  }

  topicturelistforyou(){
    this.router.navigate(["/picture-list-foryou"])
    this.location.go("picture-list-foryou")
  }

  profilebtnclicked(){
    this.router.navigate(["/profile-forme"])
    this.location.go('/profile-forme');
  }
  clickedOnFollower(){
    this.router.navigate(["/follower"])
    this.location.go('/follower');
  }
  clickedOnFolgeIch(){
    this.router.navigate(["/folgeich"])
    this.location.go('/folgeich');
  }
  toprofile() {
    this.router.navigate(["/profile-forme"])
    this.location.go('/profile-forme');
  }
  logoutClicked(){
    localStorage.removeItem("jwt")
    this.router.navigate(["/login"])
    this.location.go('/login');
  }

  onKey(event: any) { // without type info
    this.commentText = event.target.value;
  }

  clickOnPB(username : any) {
    this.router.navigate(["/profile/"+username])
    this.location.go('/profile/'+username);
  }
}
