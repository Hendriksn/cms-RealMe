import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpServiceService} from "../services/http-service.service";
import validateForm from "../helper/validateform";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileFormeComponent} from "../profile-forme/profile-forme.component";


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  myProfile: any;
  public username: string | undefined
  public givenName: string | undefined
  public familyName: string | undefined
  public age: string | undefined
  public email: string | undefined
  public pb: any;


  public UpdateForm!: FormGroup


  constructor(public activeModal: NgbActiveModal, private httpService: HttpServiceService,
              private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  fileToUpload: File | undefined;
  fileID: any

  ngOnInit(): void {
    this.httpService.checkAuth();
    this.httpService.getMyProfile().subscribe(
      (response) => {
        console.log(response);
        this.myProfile = response;
        this.username = this.myProfile.username
        this.givenName = this.myProfile.givenName
        this.familyName = this.myProfile.familyName
        this.age = this.myProfile.age
        this.email = this.myProfile.email
      })


    this.UpdateForm = this.formBuilder.group({
      username: [``, Validators.required],
      givenName: [``, Validators.required],
      familyName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
    });

  }


  save() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // @ts-ignore
    if (this.UpdateForm.valid && this.username.length > 2 &&
      this.UpdateForm.value.email.match(mailformat) && !isNaN(Number(this.UpdateForm.value.age))) {

     this.httpService.uploadPicFile(this.fileToUpload).subscribe(
       (response) => {
         // @ts-ignore
         console.log(response[0].id)
         // @ts-ignore
         this.httpService.uploadProfilePicPost(response[0].id, this.myProfile.id).subscribe(
           (response) => {console.log(response); this.activeModal.close(response)},
           (error) => {console.log(error)})
       },

       (error) => { console.log(error); });
      this.activeModal.close(this.UpdateForm)
    }
       else{
        this.toastr.error("Es wurden nicht alle Felder ausreichend ausgefüllt", "Fehler")
        validateForm.validateAllformFields((this.UpdateForm))
      }
  }

  handleFileInput(files: Event) {
    // @ts-ignore
    this.fileToUpload = files.target.files[0];
    console.log(this.fileToUpload)
  }

}
