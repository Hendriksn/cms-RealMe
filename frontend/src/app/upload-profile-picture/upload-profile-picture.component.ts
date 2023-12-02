import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpServiceService} from "../services/http-service.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.scss']
})
export class UploadProfilePictureComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private httpService: HttpServiceService, private formBuilder: FormBuilder) {
    this.UploadForm = this.formBuilder.group({
      picture: ['', Validators.required],
    });
  }
  myProfile : any;
  UploadForm: any;
  picture : any;
  fileToUpload: File | undefined;
  fileID : any


  ngOnInit(): void {

  }

  save() {
    // if (this.title.trim().length > 0) {
    //   this.activeModal.close(this.title);
    console.log("description: ", this.UploadForm);
    console.log(btoa(this.UploadForm.value.picture.value))
    //console.log("file: "+ this.UploadForm.file.picture);

    const data = {};
    const formData = new FormData();
    formData.append("test", "test")
    // @ts-ignore
    data[description] = this.UploadForm.value.description;


  }
  handleFileInput(files: Event) {
    // @ts-ignore
    this.fileToUpload = files.target.files[0];

  }

}
