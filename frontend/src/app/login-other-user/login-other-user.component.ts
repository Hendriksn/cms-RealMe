import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpServiceService} from "../services/http-service.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import validateForm from "../helper/validateform";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login-other-user',
  templateUrl: './login-other-user.component.html',
  styleUrls: ['./login-other-user.component.scss']
})
export class LoginOtherUserComponent implements OnInit {

  isText: boolean = false
  type: string = "password"
  faEye = faEye;
  username : any = ""

  public loginForm!: FormGroup

  constructor(private location: Location, private router: Router, private route: ActivatedRoute,
              public httpService: HttpServiceService, private formBuilder: FormBuilder,
              private http: HttpClient, private toastr: ToastrService, ) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ['', Validators.required]
    })
  }

  async login() {
    console.log(this.loginForm.value.password)
    console.log(this.loginForm.value.username)


    if (this.loginForm.valid) {
      const username: string = this.loginForm.value.username
      const password: string = this.loginForm.value.password
      console.log(username, password)
      this.httpService.login(username, password
      ).subscribe(res => {
          let token = res.jwt
          this.toastr.success("Anmeldung Erfolgreich!")

          console.log(localStorage)
          localStorage.setItem("jwt", token)
          console.log(token)
          if (token != null) {
            this.router.navigate(["/profile-forme"])
            this.location.go('/profile-forme');

          } else {
            this.toastr.error("Nutzer konnte nicht gefunden werden")

          }
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
          if (msg.status !== 200) {
            this.toastr.error("Nutzername oder Passwort falsch")
          }
        }
      )
    } else {
      this.toastr.error("Nutzername oder Password falsch", "Anmeldung fehlgeschlagen")
      validateForm.validateAllformFields(this.loginForm)
    }
  }

  showhide() {
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }

}
