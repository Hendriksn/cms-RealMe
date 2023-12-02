import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpServiceService} from "../services/http-service.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private httpService: HttpServiceService, private formBuilder: FormBuilder) {
    this.UploadForm = this.formBuilder.group({
      description: ['', Validators.required],
      picture: ['', Validators.required],
    });
  }
  myProfile : any;
  UploadForm: any;
  picture : any;
  fileToUpload: File | undefined;
  fileID : any


  ngOnInit(): void {
    this.httpService.checkAuth();
    this.httpService.getMyProfile().subscribe(
      (response) => { console.log(response) ;this.myProfile = response;
      })
  }

  save() {
    console.log("description: ", this.UploadForm);
    console.log(btoa(this.UploadForm.value.picture.value))
    const data = {};
    const formData = new FormData();
    formData.append("test", "test")
    // @ts-ignore
    data[description] = this.UploadForm.value.description;




    this.httpService.uploadPicFile(this.fileToUpload).subscribe(
      (response) => {
        // @ts-ignore
        console.log(response[0].id);
        // @ts-ignore
        this.fileID = response[0].id;
        this.httpService.uploadPicPost(this.UploadForm.value.description, this.myProfile.id, this.fileID).subscribe(
          (response) => {console.log(response); this.activeModal.close(true)},
          (error) => {console.log(error)})
      },

      (error) => { console.log(error); });
    /*
        this.http.post('http://localhost:8001/upload.php', formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          })

     */

  }


  handleFileInput(files: Event) {
    // @ts-ignore
    this.fileToUpload = files.target.files[0];
    console.log(this.fileToUpload)

  }
}
