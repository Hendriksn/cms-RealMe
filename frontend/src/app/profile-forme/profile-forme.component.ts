import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpServiceService} from "../services/http-service.service";
import {faComment, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup} from "@angular/forms";
import {types} from "sass";
import {UploadPictureComponent} from "../upload-picture/upload-picture.component";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-profile-forme',
  templateUrl: './profile-forme.component.html',
  styleUrls: ['./profile-forme.component.scss']
})
export class ProfileFormeComponent implements OnInit, DoCheck {
  faComment = faComment;
  faTrash = faTrash;
  selected = 0;
  hovered = 0;
  readonly = false;
  private _pictureID: any;

  constructor(private location: Location, private router: Router, private httpService: HttpServiceService,
              private modalService: NgbModal, private toastr: ToastrService) {
  }

  myProfile: any;
  follower: any;
  followI: any;
  pictures: any;
  serverAdress: any = this.httpService.server;
  rate: any;
  usersIfollow: any;
  rateScore: any = 0;
  ratingcontrol = new FormControl(0);
  private rateResponse: any;


  ngOnInit() {
    this.httpService.checkAuth();
    this.httpService.getMyProfile().subscribe(
      (response) => {
        console.log(response);
        this.myProfile = response;
        localStorage.setItem("lastUserPB", this.myProfile.profilePicture.formats.thumbnail.url)
        localStorage.setItem("lastUserUsername", this.myProfile.username)
        localStorage.setItem("lastUserPB", this.myProfile.profilePicture.formats.thumbnail.url)
        localStorage.setItem("lastUserUsername", this.myProfile.username)
        this.httpService.getProfileFollows(this.myProfile.id).subscribe(
          (response) => { this.follower = response; },
          (error) => { console.log(error); });
        this.httpService.getProfileFollowI(this.myProfile.id).subscribe(
          (response) => {this.followI = response; console.log("Hier:");},
          (error) => { console.log(error); });
        this.httpService.getProfilePictures(this.myProfile.id).subscribe(
          (response) => {console.log(response);this.pictures = response;
            this.calcRating()
            },
          (error) => { console.log(error); });
        this.httpService.getRate(this._pictureID.rate).subscribe(
          (response) => {console.log(response);this.rate = response; },
          (error) => { console.log(error);
            console.log(this.rate)});
      },
      (error) => { console.log(error); });

    // @ts-ignore
    let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-gray")
    btnformyou.classList.add("button-orange")
    btndiscovery.classList.remove("button-gray")
    btndiscovery.classList.add("button-orange")
    btnuser.classList.remove("button-orange")
    btnuser.classList.add("button-gray")


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

  ngDoCheck(): void {
    // @ts-ignore
    let btnformyou: HTMLButtonElement = document.getElementById("btnforyou")
    // @ts-ignore
    let btndiscovery: HTMLButtonElement = document.getElementById("btndiscovery")
    // @ts-ignore
    let btnuser: HTMLButtonElement = document.getElementById("btnuser")

    btnformyou.classList.remove("button-gray")
    btnformyou.classList.add("button-orange")
    btndiscovery.classList.remove("button-gray")
    btndiscovery.classList.add("button-orange")
    btnuser.classList.remove("button-orange")
    btnuser.classList.add("button-gray")

  }

  clickedComment(pictureID: any){
    this._pictureID = pictureID;
    this.router.navigate(["/comments/" + pictureID])
    this.location.go('/comments' + pictureID);
  }

  clickedOnFollower(id: any) {
    this.router.navigate(["/follower/" + id])
    this.location.go('/follower/' + id);
  }

  clickedOnFolgeIch(id: any) {
    this.router.navigate(["/folgeich/" + id])
    this.location.go('/folgeich/' + id);
  }

  logoutClicked() {
    localStorage.removeItem("jwt")
    this.router.navigate(["/login"])
    this.location.go('/login');
    this.toastr.success("Abmeldung war Erfolgreich!");
  }

  deleteAcc(){
    //delete all pics of profile:
    this.httpService.getAllCommentsOfUser(this.myProfile.id).subscribe(
      async (response) => {
        console.log(response);
        // @ts-ignore
        response.data.forEach((comment: { "": any; }) => {
          // @ts-ignore
          this.httpService.deleteComment(comment.id).subscribe(
            (response) => {
              console.log(response);
              this.toastr.success("Löschen des Accounts war erfolgreich!");
            },
            (error) => {
              console.log(error);
              this.toastr.error("Es ist ein fehler beim Löschen des Accounts entstanden");
            })
        })

        await this.followI.data.forEach((followi: { "": any; }) => {
          // @ts-ignore
          this.deleteFollow(followi.id)
        })

        await this.follower.data.forEach((follower: { "": any; }) => {
          // @ts-ignore
          this.deleteFollow(follower.id)
        })

        await this.pictures.data.forEach((picture: { "": any; }) => {
          // @ts-ignore
          this.clickedDelete(picture.id)
        });

        //deleteProfile:
        const number: number = this.myProfile.id
        this.httpService.deleteProfile(number).subscribe(
          (response) => {
            console.log(response);
            console.log("deletejwt");
            localStorage.removeItem("jwt");
            this.router.navigate(["/login"]);
            this.location.go("/login")
          },
          (error) => {
            console.log(error);
          });

      },
      (error) => { console.log(error); });
  }

  async UpdateProfile() {
    try {
      const ergebnis: FormGroup = await this.modalService.open(UpdateUserComponent).result;
       this.httpService.updateProfile(this.myProfile.id, ergebnis).subscribe(
        (response) => {
          console.log(response);
          console.log("ngOnInit")
          this.toastr.success("Profil wurde erfolgreich geändert")
          this.ngOnInit()
        },
        (error) => {
          console.log(error);
          this.toastr.error("Ein Fehler ist aufgetreten.")
        });

    } catch (err) {
      console.log("Window closed...", err);
    }
  }

  async UploadPicture() {
    try {
      const ergebnis = await this.modalService.open(UploadPictureComponent).result;
      if (ergebnis === true) {
        this.ngOnInit()
        this.toastr.success("Dein Post wurde veröffentlicht")
      }
    } catch (err) {
      console.log("Window closed...", err);
      this.toastr.error("Dein Post konnte nicht geladen werden")
    }
  }

  deleteFollow(followID : any) {
    this.httpService.deleteFollow(followID).subscribe(
      (response) => { console.log(response)},
      (error) => { console.log(error); });
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


  clickedDelete(picID: any) {
    this.httpService.deletePicture(picID).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastr.success("Dein Post wurde gelöscht")
      },
      (error) => {
        console.log(error);
        this.toastr.error("Es ist ein Problem beim Löschen deines Posts entstanden")
      });
  }
}
