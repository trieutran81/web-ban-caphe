import { Component, OnInit } from '@angular/core';
import { AdServiceService } from '../ad-service/ad-service.service';
import { FormBuilder ,FormGroup, Validators , FormControl} from '@angular/forms';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css',
  '../../assets/member/css/style.css',
  '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../assets/member/css/lightbox.css',
  '../../assets/member/css/slider.css',
  '../../assets/member/css/util.css'
]
})
export class ProductViewComponent implements OnInit {
  items:Items[];
  attachFiles : AttachFile[];
  id : string;
  constructor(private adService: AdServiceService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");      
    });
    this.loadAttachFile();
    this.loadItemByType();
  }
  loadAttachFile(){
    this.adService.findItemByAttachFile()
    .pipe(first())
    .subscribe(res=>{
      if(res.success == "true")
      {
        this.attachFiles = res.data; 
        console.log(this.attachFiles.length);
      }
    }, err => {
      console.log(err.message)
  });
  }
  loadItemByType(){
    this.adService.findItemByType(this.id)
    .pipe(first())
    .subscribe(res=>{
      if(res.success == "true")
      {
        this.items= res.data; 
        console.log(this.items.length);
      }
    }, err => {
      console.log(err.message)
  });
  }
  onGotoProductDetail(id) {
    this.router.navigate(["/product/detail"], { queryParams: { id: id } });
  }
}
