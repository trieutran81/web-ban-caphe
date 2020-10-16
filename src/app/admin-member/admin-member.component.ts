import { AfterViewInit, Component, OnInit, Renderer ,ChangeDetectorRef} from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { NuServiceService } from '../nu-service/nu-service.service';
import { Users} from '../../models/Users';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserServiceService } from '../ad-service/user-service.service';

@Component({
  selector: 'app-admin-member',
  templateUrl: './admin-member.component.html',
  styleUrls: ['./admin-member.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css']
})
export class AdminMemberComponent implements OnInit {
  dataTable: any;
  users:Users[];
  usersTmp:Users[];
  email:string;
  userAdmin: Users;
  selectedImg: string = "";
  y:number;
  lastname:string = "";
  constructor(private adService: AdServiceService, private nonUserService: NuServiceService,
    private router: Router,private chRef: ChangeDetectorRef,private userService:UserServiceService) { 
      this.users = new Array();
      this.usersTmp = new Array();
      this.userAdmin = new Users();
      this.y= 0 ;
      this.lastname = "";
    }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.router.navigate(["/login"]);
    }
    this.loadUser();
    this.loadAllUser();

  }
  loadUser() {
    this.userService.findUser(this.email)
      .subscribe(res => {
        if (res.success == "true") {
          this.userAdmin = res.data;
          console.log("last name :" +this.userAdmin.lastname)
          this.selectedImg = res.data.avatar;
          this.lastname = res.data.lastname;

        }
      }, err => {
        console.log(err.message)
      });
  }
  loadAllUser(){
    this.users = new Array();
    this.y = 0;
    this.adService.loadAllUser()
    .subscribe(res => {
      if(res.success == "true")
      {
        
        this.usersTmp = res.data;

        for (var i = 0; i < this.usersTmp.length; i++) {
          console.log("status :" + this.usersTmp[i].status);
          if (this.usersTmp[i].status == 1) {
            this.users[this.y] = this.usersTmp[i];
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
  onResetPassoword(email)
  {
    this.nonUserService.resetPassword(email)
    .subscribe(res => {
        alert("Password đã được reset về 12345678");
    }, err => {
      console.log(err.message)
  });
  }
  onLogout(){
    localStorage.clear()
    this.router.navigate(["/login"]);
  }

}
