import { Component, OnInit } from '@angular/core';
import { AdServiceService } from '../ad-service/ad-service.service';
import { FormBuilder ,FormGroup, Validators , FormControl} from '@angular/forms';
import { Bill } from '../../models/Bill';
import { Items } from '../../models/Items';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin-bill-detail',
  templateUrl: './admin-bill-detail.component.html',
  styleUrls: ['./admin-bill-detail.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css']
})
export class AdminBillDetailComponent implements OnInit {
  items:Items[];
  bill:Bill;
  email:string;
  id : string;
  error:string;
  constructor(private route : Router,private adService:AdServiceService,private activatedRoute: ActivatedRoute) { 
    this.bill = new Bill();
    this.items = new Array();
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.route.navigate(["/login"]);
    }
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");      
    });
    this.loadDetailBill(this.id);
  }
 loadDetailBill(id) {
    if(this.id)
    {
      this.adService.loadBill(id)
      .pipe(first())
      .subscribe(res => {
        if(res.success == "true")
        {
          this.bill = res.data;
        }
        else
        {
            this.error = res.message
        }
      }, err => {
        console.log(err)
      });
      this.adService.findItembyBill(id)
      .pipe(first())
      .subscribe(res => {
        if (res.success == "true") {
          this.items = res.data;
        }
        else {
          this.error = res.message
        }
      }, err => {
        console.log(err)
      });  

    }
  }
  onLogout(){
    localStorage.clear()
    this.route.navigate(["/login"]);
  }

}
