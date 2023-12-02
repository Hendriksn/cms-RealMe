import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {catchError} from "rxjs";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {



  constructor(private http: HttpClient, private router: Router, private location: Location) { }
  error : any;
  //public server : any = "http://cms.marc-troell.de:1337";
  public server : any = "http://localhost:1337";

  uploadPicFile(file: File | undefined) {
    //console.log("Upload: "+UploadForm)
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/upload';
    console.log()
    const formData = new FormData();
    // @ts-ignore
    formData.append("files", file)
    // @ts-ignore
    return this.http.post(api, formData, {headers: new HttpHeaders({'Authorization': 'bearer '+token})});
  }

  uploadPicFileWJWT(file: File | undefined) {
    //console.log("Upload: "+UploadForm)
    let api = this.server+'/api/upload';
    console.log()
    const formData = new FormData();
    // @ts-ignore
    formData.append("files", file)
    // @ts-ignore
    return this.http.post(api, formData);
  }

  uploadPicPost(description: any, userID: any, fileID: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/pictures';
    return this.http.post(api, {data: {description: description, creator: userID, file: fileID}},{headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  uploadProfilePicPost(fileID: any, userID: any) {
    let api = this.server+'/api/users/'+ userID;
    console.log("update PB: "+ userID+" pb: "+fileID)
    return this.http.put(api, {profilePicture: fileID});
  }

  getProfile(username : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/users/?populate=*&filters[username][$eq]='+username;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getMyProfile() {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/users/me?populate=deep';
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getAllProfilePictures() {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/users/?populate=profilePicture';
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getProfileFollows(id : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/follows?populate=deep&[filters][follow_in][id][$eq]='+id;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getProfileFollowI(id : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/follows?populate=deep&[filters][follow_out][id][$eq]='+id;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getProfilePictures(id : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/pictures?sort[0]=createdAt:desc&populate=*&[filters][creator][id][$eq]='+id;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getPictures() {
    let api = this.server+'/api/pictures?sort[0]=createdAt:desc&populate=deep';
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json'})});
  }

  getArrPictures(arr: any[]) {
    let api = this.server+'/api/pictures?sort[0]=createdAt:desc&populate=deep';
    if (arr.length > 0) {
      arr.forEach((id: { "": any; }) => {
        api = api+"&[filters][creator][id][$eq]="+id
      })
    } else {
      api = api+"&[filters][creator][id][$eq]=0"
    }

    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json'})});
  }


  getPicture(id : any) {
    let api = this.server+'/api/pictures?populate=deep&filters[id][$eq]='+id;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json'})});
  }

  getRate (id: any){
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/pictures?/rate?populate=deep&filters[id][$eq]='+id;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getComments(picID : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/comments?sort[0]=createdAt:asc&populate=deep&filters[picture][id][$eq]='+picID;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  setComment(userID: any, picID: any, text: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/comments';
    return this.http.post(api, {data: {text: text, author: [userID], picture: [picID]}},{headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  setFollow(outUserID: any, inUserID: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/follows';
    return this.http.post(api, {data: {follow_out: [outUserID], follow_in: [inUserID]}},{headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  setRate(picID: any, userID: any, rateValue: any) {
    let token = localStorage.getItem("jwt")
    let api2 = this.server+'/api/evaluations';
    let api = this.server+'/api/evaluations?filters[user][id][$eq]='+userID+'&filters[picture][id][$eq]='+picID;
    let rateID = 0
    let api1 = this.server+'/api/evaluations/'+picID;

    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})})
  }

  createRate(picID: any, userID: any, rateValue: any) {
    let api2 = this.server+'/api/evaluations';
    let token = localStorage.getItem("jwt")
    console.log("unter 0");
    return this.http.post(api2, {data: {user: [userID], picture: [picID], points: rateValue.toString()}},{headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})})
  }

  updateRate(picID: any, userID: any, rateValue: any, response: Object) {
    let token = localStorage.getItem("jwt")
    // @ts-ignore
    let api2 = this.server+'/api/evaluations/'+response.data[0].id
    return this.http.put(api2, {data: {points: rateValue.toString()}},{headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})})
  }

  checkFollow(idOut : any, idIn: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/follows?populate=deep&[filters][follow_out][id][$eq]='+idOut+'&[filters][follow_in][id][$eq]='+idIn;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  deleteFollow(followID: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/follows/'+followID;
    return this.http.delete(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  deletePicture(pictureID: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/pictures/'+pictureID;
    return this.http.delete(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  getAllCommentsOfUser(userID: any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/comments?populate=deep&[filters][author][id][$eq]='+userID;
    return this.http.get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  deleteComment(commentID : any) {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/comments/'+commentID;
    return this.http.delete(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})});
  }

  login(identifier: string, password: string) {
    console.log(identifier, password)
    return this.http.post<any>(this.server+"/api/auth/local",
      {
        identifier, password
      })
  }

  signUp(SignUpForm: FormGroup){
    console.log(SignUpForm.value)
    return this.http.post<any>(this.server+"/api/auth/local/register", SignUpForm.value)
  }

  updateProfile( id: number, UpdateForm: FormGroup){
    console.log(id)
    console.log(UpdateForm.value)
    let token = localStorage.getItem("jwt")
    let api = this.server + "/api/users/" + id;
    return this.http.put(api, UpdateForm.value, {headers: new HttpHeaders( {'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})
      });
  }

  deleteProfile(id: number){
    let token = localStorage.getItem("jwt")
    let api = this.server + "/api/users/" + id;
    return this.http.delete(api,{headers: new HttpHeaders( {'Content-Type' : 'application/json', 'Authorization': 'bearer '+ token})
  })}

  checkAuth() {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/users/me';
    this.http
      .get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})})
      .subscribe(
        res => console.log(res),
        msg => {console.error(`Error: ${msg.status} ${msg.statusText}`);
        if (msg.status !== 200) {
          this.router.navigate(["/register"])
        }}
      );
  }

  // @ts-ignore
  checkLoggedIn() {
    let token = localStorage.getItem("jwt")
    let api = this.server+'/api/users/me';
    this.http
      .get(api, {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'bearer '+token})})
      .subscribe(
        res => {console.log("erfolg"); return "1"},
        msg => {console.error(`Error: ${msg.status} ${msg.statusText}`);
          return "0"
}
      );
  }

}
