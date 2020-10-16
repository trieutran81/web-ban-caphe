import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { UserServiceService } from '../ad-service/user-service.service';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Types } from '../../models/Types';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',
  '../../assets/member/css/style.css',
  '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../assets/member/css/lightbox.css',
  '../../assets/member/css/slider.css',
  '../../assets/member/css/util.css'
]
})
export class ProductComponent implements OnInit {
  items:Items[];
  itemsProduct:Items[];
  attachFiles : AttachFile[];
  check:number=0;
  email : string;
  error:string;
  imgCart:string;
  constructor(private adService: AdServiceService,private userService: UserServiceService, private router: Router) { 
    this.itemsProduct = new Array();
    this.items = new Array();
  }

  ngOnInit(): void {
    this.adService.loadAllItem()
    .subscribe(res => {
      if(res.success == "true")
      {
        this.items = res.data; 
        if(this.items!=null){
          var kt1=0,kt2 = 0 ,kt3=0, y = 9;
          for(var i = 0 ;i<this.items.length;i++)
          {
            if(this.items[i].typesId ==  1 && kt1 <3 )
            {
              this.itemsProduct[y-9] = this.items[i];
              kt1 ++;
            }
            if(this.items[i].typesId ==  2 && kt2 <3 )
            {
              this.itemsProduct[y-9] = this.items[i];
              kt2++;
            }
            if(this.items[i].typesId ==  3 && kt3 <3 )
            {
              this.itemsProduct[y-9] = this.items[i];
              kt3++;
            }
            y++;
          }
        }
        console.log("data :" + res.data.length)
      }
     
    }, err => {
      console.log(err.message)
  });
  this.adService.findItemByAttachFile()
  .pipe(first())
  .subscribe(res=>{
    if(res.success == "true")
    {
      this.attachFiles = res.data; 
    }
  }, err => {
    console.log(err.message)
});
this.email = localStorage.getItem("email");
  }
  createCart(id) {
    if(this.email){
      this.userService.createCart(id,this.email,1)
        .pipe(first())
        .subscribe(res => {
          this.imgCart= "../../assets/member/images/shopping_cart.png";
          this.router.navigate(['/product']);
          location.reload();
        }, err => {
          this.error = err.messger;
        });
    }
    else{
      alert("Bạn phải đăng nhập !!");
      this.router.navigate(['/login'])
    }
   

  }
  onGotoProductView(id) {
    this.router.navigate(["/product/view"], { queryParams: { id: id } });
  }
  onGotoProductDetail(id) {
    this.router.navigate(["/product/detail"], { queryParams: { id: id } });
  }
}
