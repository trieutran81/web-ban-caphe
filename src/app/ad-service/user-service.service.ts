import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Items } from '../../models/Items';
import { Types } from '../../models/Types';
import { Users } from '../../models/Users';
import { AttachFile } from '../../models/Attach_File';

import {Observable } from 'rxjs';
import {of } from 'rxjs';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError,tap} from 'rxjs/Operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  context = environment.base_user_url;
  constructor(private http:HttpClient) { }
  createCart(idItem,email,quality) : Observable<any>{
    return this.http.post(`${this.context}api/v1/user/additemincart/${email}/${idItem}/${quality}`,"");
  }
  deleteCartItem(idItem,email) : Observable<any>{
    return this.http.delete(`${this.context}api/v1/user/deleteitemincart/${email}/${idItem}`);
  }
  findCartItem(email) : Observable<any>{
    return this.http.get(`${this.context}api/v1/user/itemincart/${email}`);
  }
  findUser(email) : Observable<any>{
    return this.http.get(`${this.context}api/v1/user/${email}`);
  }
  updateUser(user:Users) : Observable<any>{
    return this.http.post(`${this.context}api/v1/user/update/${user.email}`,user);
  }
  createBill(email) : Observable<any>{
    return this.http.post(`${this.context}api/v1/user/buy/${email}`,"");
  }
}
