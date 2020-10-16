import { AfterViewInit, Component, OnInit, Renderer ,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { UserServiceService } from '../ad-service/user-service.service';
import { Users } from '../../models/Users';
import { Bill } from '../../models/Bill';
import { AttachFile } from '../../models/Attach_File';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css']
})
export class AdminBillComponent implements OnInit {

  bills : Bill[];
  users : Users[] ;
  user: Users;
  userAdmin: Users;
  dataTable: any;
  index : number;
  email:string;
  selectedImg: string = "";
  constructor(private http: HttpClient,private adService: AdServiceService,private userService:UserServiceService,
    private router: Router,private chRef: ChangeDetectorRef) {
      this.user = new Users();
      this.userAdmin = new Users();
      this.users = new Array();
      this.bills = new Array();
     }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.router.navigate(["/login"]);
    }
    this.loadBill();
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
  loadBill(){
    this.adService.loadAllBill()
    .subscribe(res => {
      if(res.success == "true")
      {
        
        this.bills = res.data;
        
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
  findUserByBill(id){
    this.adService.findUserByBill(id)
    .subscribe(res=>{
      if(res.success =="true")
      {
        this.user= res.data;
        console.log("user : " +this.user.lastname )
      }
    })
  }
  onLogout(){
    localStorage.clear()
    this.router.navigate(["/login"]);
  }
  onGotoBillDetail(id) {
    this.router.navigate(["/admin/bill/detail"], { queryParams: { id: id } });
  }
}
