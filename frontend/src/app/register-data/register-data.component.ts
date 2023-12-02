import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpServiceService} from "../services/http-service.service";
import validateForm from "../helper/validateform";
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadProfilePictureComponent} from "../upload-profile-picture/upload-profile-picture.component";

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {

  isText: boolean = false
  type: string = "password"
  faEye = faEye;

  public SignUpForm!: FormGroup

  constructor(private location: Location, private router: Router,
              private formBuilder: FormBuilder, private HttpService: HttpServiceService,
              private toastr: ToastrService, public modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  fileToUpload: File | undefined;
  fileID: any

  async signUp() {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.SignUpForm.valid && this.SignUpForm.value.username.length > 2 && this.SignUpForm.value.password.length > 7 &&
      this.SignUpForm.value.email.match(mailformat) && !isNaN(Number(this.SignUpForm.value.age))) {


      await this.HttpService.signUp(this.SignUpForm)
        .subscribe((res => {
          console.log(res.user.id)
          this.HttpService.uploadPicFileWJWT(this.fileToUpload).subscribe(
            (response) => {
              // @ts-ignore
              console.log(response[0].id)
              // @ts-ignore
              this.HttpService.uploadProfilePicPost(response[0].id, res.user.id).subscribe(
                (response) => {
                  console.log(response);
                  this.toastr.success("Sie können sich jetzt anmelden", "Registrierung erfolgreich!")
                  this.router.navigate(["/login-other-user"])
                  this.location.go('/login-other-user');
                  this.SignUpForm.reset();
                },
                (error) => {
                  console.log(error)
                })
            },

            (error) => {
              console.log(error);
            });

        }), msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
          if (msg.status !== 201) {
            this.toastr.error("Die Registrierung ist fehlgeschlagen. Möglicherweise wurde der Benutzername bereits verwendet.", "Fehler");

          }
        })
    } else {
      this.toastr.error("Es wurden nicht alle Felder ausreichend ausgefüllt", "Fehler")
      validateForm.validateAllformFields((this.SignUpForm))
    }
  }

  showhide() {
    console.log("moin")
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }


  handleFileInput(files: Event) {
    // @ts-ignore
    this.fileToUpload = files.target.files[0];
    console.log(this.fileToUpload)
  }

}
