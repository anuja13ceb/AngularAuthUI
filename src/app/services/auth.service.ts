import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string =environment.baseApiUrl ;
  constructor(private http:HttpClient) { }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl+'/api/UserUI');
  }

  signUp(userObj:any):Observable<any>{
    
   return this.http.post<any>(this.baseApiUrl+'/api/UserUI/register',userObj);
  }



  signIn(loginObj : any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/api/UserUI/authenticate',loginObj)
  }


    // signUp(userObj: any) {
  //   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  // }
  // getUsers() {
  //   return this.http.get<any>(this.baseApiUrl);
  // }



}
