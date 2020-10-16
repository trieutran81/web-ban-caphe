import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css'
]
})
export class AdminIndexComponent implements OnInit {

  email:string;
  constructor(private route : Router) { }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.route.navigate(["/login"]);
    }
  }
  onLogout(){
    localStorage.clear()
    this.route.navigate(["/login"]);
  }

}
