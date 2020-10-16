import { AfterViewInit, Component, OnInit, Renderer, ChangeDetectorRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { Items } from '../../models/Items';
import { Types } from '../../models/Types';
import { AttachFile } from '../../models/Attach_File';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Users } from '../../models/Users';
import { UserServiceService } from '../ad-service/user-service.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-admin-type',
  templateUrl: './admin-type.component.html',
  styleUrls: ['./admin-type.component.css',
    '../../assets/admin/assets/css/bootstrap.min.css',
    '../../assets/admin/assets/css/animate.min.css',
    '../../assets/admin/assets/css/paper-dashboard.css',
    '../../assets/admin/assets/css/demo.css',
    '../../assets/admin/assets/css/themify-icons.css']
})
export class AdminTypeComponent implements OnInit {
  dataTable: any;
  itemtmp: Items[];
  items: Items[];
  itemDel: Items;
  attachFiles: AttachFile[];
  email: string;
  userAdmin: Users;
  selectedImg: string = "";
  y: number;
  context = environment.base_admin_url;

  constructor(private http: HttpClient, private adService: AdServiceService,private userService:UserServiceService,
    private router: Router, private chRef: ChangeDetectorRef) {
    this.items = new Array();
    this.itemtmp = new Array();
    this.itemDel = new Items();
    this.userAdmin = new Users();
    this.y = 0;
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    if (!this.email) {
      alert("Vui lòng đăng nhập!!");
      this.router.navigate(["/login"]);
    }
    this.loadAllItem();
    this.loadUser();
  }
  loadUser() {
    this.userService.findUser(this.email)
      .subscribe(res => {
        if (res.success == "true") {
          this.userAdmin = res.data;
          console.log("last name :" +this.userAdmin.lastname)
          this.selectedImg = res.data.avatar;

        }
      }, err => {
        console.log(err.message)
      });
  }
  loadAllItem()
  {
    this.items = new Array();
    this.y = 0 ;
    this.adService.loadAllItem()
    .subscribe(res => {
      if (res.success == "true") {

        this.itemtmp = res.data;
        for (var i = 0; i < this.itemtmp.length; i++) {
          if (this.itemtmp[i].status == 1) {
            this.items[this.y] = this.itemtmp[i];
            this.y++;
          }
        }
      }


      // You'll have to wait that changeDetection occurs and projects data into 
      // the HTML template, you can ask Angular to that for you ;-)
      this.chRef.detectChanges();

      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    }, err => {
      console.log(err.message)
    });
  }
  deleteItem(id) {
    console.log("id : " + id)
    this.adService.deleteItem(id)
      .subscribe(res => {
          this.loadAllItem();
    
      }, err => {
        console.log(err);
      })

  }
  onLogout() {
    localStorage.clear()
    this.router.navigate(["/login"]);
  }
  onGotoItemDetail(id) {
    this.router.navigate(["/admin/type/detail"], { queryParams: { id: id } });
  }


}
