import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { UserServiceService } from '../ad-service/user-service.service';
import { Users } from '../../models/Users';
import { AttachFile } from '../../models/Attach_File';
import { Types } from '../../models/Types';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',
  '../../assets/member/css/style.css',
  '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../assets/member/css/lightbox.css',
  '../../assets/member/css/slider.css',
  '../../assets/member/css/util.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
  '../../assets/admin/assets/css/animate.min.css',
  '../../assets/admin/assets/css/paper-dashboard.css',
  '../../assets/admin/assets/css/demo.css',
  '../../assets/admin/assets/css/themify-icons.css']
})
export class ProfileComponent implements OnInit {
  email: string;
  user: Users;
  birthdayDate: Date;
  selectedImg: string = "";
  form: FormGroup;
  image: string = "";
  imageUploaded: string = "";
  error: string;
  oldpass_error:string = "";
  newpass_error:string = "";
  oldpass:string;
  newpass:string;
  newpasscf:string;
  dateTemp: string;
  constructor(private route: Router, private userService: UserServiceService, private fb: FormBuilder) {
    this.user = new Users;
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null,
      formFirstName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formLastName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formDescription: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formBirthday: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formAddress: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formPhone: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formEmail: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    });
   }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if (!this.email) {
      alert("Vui lòng đăng nhập!!");
      this.route.navigate(["/login"]);
    }
    this.loadUser();
  }
  loadUser() {
    this.userService.findUser(this.email)
      .subscribe(res => {
        if (res.success == "true") {
          this.user = res.data;
          this.dateTemp = moment(res.data.birthday).format("YYYY-MM-DD").toString();
          this.selectedImg = res.data.avatar;
          this.imageUploaded = res.data.avatar;
          this.birthdayDate = this.user.birthday;
          console.log(this.dateTemp);
        }
      }, err => {
        console.log(err.message)
      });
  }
  updateUser() {
    this.imageUploaded = this.form.get('avatar').value.value;
    this.user.avatar = this.imageUploaded;
    this.user.birthday = new Date(this.dateTemp);
    this.userService.updateUser(this.user)
      .pipe(first())
      .subscribe(res => {
        console.log(res.success);

        alert("Cập nhật thành công thành công!!");
        // this.router.navigate(['/admin/type/add']);
      }, err => {
        this.error = err.messger;
      });

  }
  checkPasswordOld(value) {
    if(this.user.password != value)
    {
      this.oldpass_error = "Mật khẩu cũ không chính xác ."
    }
    else{
      this.oldpass_error = ""
    }
   
    console.log(value);
  }
  checkPasswordNew(value) {
    if(this.user.password == value)
    {
      this.newpass_error = "Mật khẩu mới không được trùng mật khẩu cũ."
    }
    else{
      this.newpass_error = ""
    }
   
    console.log(value);
  }
  changePassword() {
    if(this.oldpass == this.user.password && this.newpass != this.oldpass && this.newpass == this.newpasscf){
      this.user.password=this.newpass;
      console.log(this.user.password);
      this.userService.updateUser(this.user)
      .pipe(first())
      .subscribe(res => {
        alert("Đổi mật khẩu thành công !!");
        this.route.navigate(['/profile']);
      }, err => {
        this.error = err.messger;
      });
    }
    else{
      alert("Cập nhật mật khẩu thành công thất bại!!");
    }
  }
  onChangedImage(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = "data:" + file.type + ";base64," + (reader.result as string).split(',')[1];
        this.selectedImg = this.image;
        this.form
          .get('avatar').setValue({
            filename: file.name,
            filetype: file.type,
            value: "data:" + file.type + ";base64," + (reader.result as string).split(',')[1]
          })
      };
    }



  }

}
