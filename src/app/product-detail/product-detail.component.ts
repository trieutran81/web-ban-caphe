import { Component, OnInit } from '@angular/core';
import { AdServiceService } from '../ad-service/ad-service.service';
import { UserServiceService } from '../ad-service/user-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css',
    '../../assets/member/css/style.css',
    '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/member/css/lightbox.css',
    '../../assets/member/css/slider.css',
    '../../assets/member/css/util.css'
  ]
})
export class ProductDetailComponent implements OnInit {
  item: Items;
  attachFiles: AttachFile[];
  error: string;
  id: string;
  imageItem: string;
  email : string;
  quantitySL:number = 1;
  quantity:number;
  constructor(private router: Router, private adService: AdServiceService,
    private userService: UserServiceService, private activatedRoute: ActivatedRoute,private fb: FormBuilder) {
    this.item = new Items();
    this.quantitySL=1;
    this.quantity = 1;
  
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    });
    // console.log(this.attachFiles);
    // this.imageItem = this.attachFiles[0].image;
    this.quantitySL=1;
    this.retrieveItemById(this.id);
  }
  retrieveItemById(id) {
    if (this.id) {
      this.adService.findItemById(this.id)
        .pipe(first())
        .subscribe(res => {
          if (res.success == "true") {
            this.item = res.data;

          }
          else {
            this.error = res.message
          }
        }, err => {
          console.log(err)
        });
      this.adService.findAttachFileByItem(this.id)
        .pipe(first())
        .subscribe(res => {
          if (res.success == "true") {
            this.attachFiles = res.data;
          }
          else {
            this.error = res.message
          }
        }, err => {
          console.log(err)
        });

    }
  }
  createCart() {
    if(this.email){
      this.userService.createCart(this.item.id,this.email,this.quantity)
        .pipe(first())
        .subscribe(res => {
          alert("Thêm thành công !!");
          this.router.navigate(['/product']);
        }, err => {
          this.error = err.messger;
        });
    }
    else{
      alert("Bạn phải đăng nhập !!");
      this.router.navigate(['/login'])
    }
   

  }

}
