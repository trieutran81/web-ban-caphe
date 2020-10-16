import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Items } from '../../models/Items';
import { Types } from '../../models/Types';
import { AttachFile } from '../../models/Attach_File';

import {Observable } from 'rxjs';
import {of } from 'rxjs';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError,tap} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AdServiceService {
  context = environment.base_admin_url;
  item : Items;
  constructor(private http:HttpClient) { }
  loadAllItem() : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/items/load`);
  }
  loadAllUser() : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/user/alluser`);
  }
  loadAllBill() : Observable<any>{
    return this.http.get(`${this.context}api/v1/bill/billitem/load`);
  }
  loadBill(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/bill/bill/${id}`);
  }
  findItembyBill(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/bill/billitem/${id}`);
  }
  findUserByBill(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/user/finduserbyid?id=${id}`);
  }
  findItemById(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/items/search?id=${id}`);
  }
  findAttachFileByItem(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/items/getAttachFile?id=${id}`);
  }
  findItemByType(id) : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/items/getType?typesId=${id}`);
  }
  findItemByAttachFile() : Observable<any>{
    return this.http.get(`${this.context}api/v1/admin/items/getAllAttachFile`);
  }
  updateItem(item:Items) : Observable<any>{
    return this.http.post(`${this.context}api/v1/admin/items/update/${item.id}`,item);
  }
  deleteItem(id) : Observable<any>{
    return this.http.post(`${this.context}api/v1/admin/items/delete/${id}`,"");
  }
  updateAttachFile(attachFile: AttachFile) : Observable<any>{
    return this.http.post(`${this.context}api/v1/admin/items/updateImage/${attachFile.id}`,attachFile);
  }
  createItem(item:Items) : Observable<any>{
    return this.http.post(`${this.context}api/v1/admin/items/create`,item);
  }
  addImage(attachFile: AttachFile): Observable<any>{
    return this.http.post(`${this.context}api/v1/admin/items/image`, attachFile,{observe:'response'});
  }
  
}
