import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  private userPayload:any;
  constructor(private http: HttpClient,private router:Router) { 
    this.userPayload = this.decodedToken();
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl + '/api/UserUI');
  }

  signUp(userObj: any): Observable<any> {

    return this.http.post<any>(this.baseApiUrl + '/api/UserUI/register', userObj);
  }

  signIn(loginObj: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/UserUI/authenticate', loginObj)
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken(){
    if(this.userPayload)
    console.log(this.userPayload.name);
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  // signUp(userObj: any) {
  //   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  // }
  // getUsers() {
  //   return this.http.get<any>(this.baseApiUrl);
  // }



}
