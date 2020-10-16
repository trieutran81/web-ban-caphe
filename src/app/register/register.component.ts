import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NuServiceService } from '../nu-service/nu-service.service';
import { Users } from '../../models/Users';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
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
export class RegisterComponent implements OnInit {

  user: Users;
  error: String;
  constructor(private router: Router, private nuService: NuServiceService) {
    this.user = new Users();
    this.user.gender = 1;
    
  }

  ngOnInit() {
  }
  register() {
    this.nuService.register(this.user).pipe(first()).subscribe(res => {
      alert("Đăng ký thành công !!");
      this.user.email = "";
      this.user.password = "";
      this.user.birthday = null;
      this.user.firstname = "";
      this.user.lastname = "";
      this.user.address = "";
      this.router.navigate(['/login']);
    }, err => {
      this.error = err.messger;
    })

  }
}
