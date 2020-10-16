import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../../models/Users';

import {Observable } from 'rxjs';
import {of } from 'rxjs';

import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class NuServiceService {

  user: Users;
  context = environment.base_nu_url;
  constructor(private http:HttpClient) { }

  login(user:Users) : Observable<any>{
    return this.http.post(`${this.context}api/v1/nuser/login/${user.email}/${user.password}`,"");
  }
  register(user:Users) : Observable<any>{
    return this.http.post(this.context +'api/v1/nuser/register',user,
    {observe:'response'});
  }
  resetPassword(email) : Observable<any>{
    return this.http.post(`${this.context}api/v1/nuser/reset/${email}`,"");
  }
}
