import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Users } from '../../models/Users';
import { UserServiceService } from '../ad-service/user-service.service';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css']
})
export class AdminMenuComponent implements OnInit {

  email : string
  error : String;
  user: Users;
  constructor( private route : Router,private userService:UserServiceService) {
    this.user = new Users();
   }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    console.log(this.email);
    this.loadUser();
   
  }
  loadUser() {
    this.userService.findUser(this.email)
      .subscribe(res => {
        if (res.success == "true") {
          this.user = res.data;
          this.user.role = res.data.role;
          if(this.user.role == 2)
          {
            alert("Liên kết không hợp lệ !");
            this.route.navigate(["/index"]);
          }
        }
      }, err => {
        console.log(err.message)
      });
  }
}
