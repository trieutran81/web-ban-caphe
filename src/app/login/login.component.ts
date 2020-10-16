import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NuServiceService } from '../nu-service/nu-service.service';
import { Users } from '../../models/Users';
import { first } from 'rxjs/operators'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  '../../assets/member/css/style.css',
  '../../assets/member/css/login.css',
  '../../assets/member/vendor/bootstrap/css/bootstrap.min.css',
  '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../assets/member/vendor/animate/animate.css',
  '../../assets/member/vendor/css-hamburgers/hamburgers.min.css',
  '../../assets/member/vendor/select2/select2.min.css',
  '../../assets/member/css/util.css',
  '../../assets/member/css/login.css'
]
})
export class LoginComponent implements OnInit {
  user: Users;
  error: String;
  constructor(private router: Router, private nuService: NuServiceService) {
    this.user = new Users() ;
   }

  ngOnInit() {
    if(localStorage.email){
      this.router.navigate(["/"]);
    }
  }
  // login() {
  //   this.nuService.login(this.user)
  //   .pipe(first())
  //   .subscribe(res => {
  //     if(res.success == true){
  //       localStorage.setItem("email",res.data.email);
  //       this.router.navigate(['/index']);
  //     }
  //     else{
  //       this.error = res.message ;
  //     }
  //   }, err => {
  //     console.log("login fail :" + err);
  //     this.error = err;
  //   });

  // }
  // login()  {
   
  //   this.nuService.login(this.user)
  //     .pipe(first())
  //     .subscribe(res => {
  //       if(res.success == "true")
  //       {

  //         localStorage.setItem("email", "trieumax81@gmail.com");
  //         localStorage.setItem("role", "1");
  //         if(res.data.role == 1){
  //           this.router.navigate(["/admin/index"]);
  //         }
  //         else
  //         {
  //           this.router.navigate(["/"]);
  //         }
  //       }
  //       else
  //       {
  //         alert("Sai email hoặc password !!")
  //           this.error = res.message
  //       }
  //     }, err => {
  //       console.log(err)
  //     })      
  // }
  login()  {
   
   
       
          localStorage.setItem("email", "trieumax81@gmail.com");
          localStorage.setItem("role", "1");
          this.router.navigate(["/admin/index"]);
     
  }
  logout(){
    localStorage.clear()
  }
}
