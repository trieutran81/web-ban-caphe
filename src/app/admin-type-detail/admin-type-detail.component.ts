import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { AdServiceService } from '../ad-service/ad-service.service';
import { FormBuilder ,FormGroup, Validators , FormControl} from '@angular/forms';
import * as moment from 'moment';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin-type-detail',
  templateUrl: './admin-type-detail.component.html',
  styleUrls: ['./admin-type-detail.component.css',
'../../assets/admin/assets/css/bootstrap.min.css',
'../../assets/admin/assets/css/animate.min.css',
'../../assets/admin/assets/css/paper-dashboard.css',
'../../assets/admin/assets/css/demo.css',
'../../assets/admin/assets/css/themify-icons.css',
'../../assets/admin/assets/css/pgwslider.css',
'../../assets/admin/assets/css/pgwslider.min.css']
})
export class AdminTypeDetailComponent implements OnInit {
  item:Items;
  attachFiles: AttachFile[];
  itemUpdate:Items;
  error : string;
  id : string;
  email:string;
  selectedImg: string = "";
  form: FormGroup;
  image: string = "";
  imageUploaded: string = "";
  constructor(private router: Router,private adService:AdServiceService,
    private activatedRoute: ActivatedRoute,private fb: FormBuilder) { 
    this.item = new Items();
    this.attachFiles = new Array();
    this.itemUpdate = new Items();
    this.itemUpdate.status=1;
    this.form = this.fb.group({
      name: ['', Validators.required],
      imagecf: null,
      formName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formType: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formPrice: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formDescription: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formImage: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formStatus: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.router.navigate(["/login"]);
    }
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");      
    });
    this.retrieveItemById(this.id);
   
  }
  onLogout(){
    localStorage.clear()
    this.router.navigate(["/login"]);
  }
  updateItem(){
    this.adService.updateItem(this.itemUpdate)
    .pipe(first())
    .subscribe(res=>{
        if(res.id){
          this.imageUploaded = this.form.get('imagecf').value.value;
          this.attachFiles[0].image = this.imageUploaded;
          this.adService.updateAttachFile(this.attachFiles[0])
          .pipe(first())
          .subscribe(res=>{
              if(res.success == "true"){
                alert("Cập nhật thành công!!");
              }
              else
              {
                alert("Cập nhật thất bại!!");
                  this.error = res.message
              }
          },err => {
            console.log(err);
          });
        }
        else
        {
          alert("Cập nhật thất bại!!");
            this.error = res.message
        }
    },err => {
      console.log(err);
    });
    
  }
  retrieveAttactFileById(){
     
  }
  retrieveItemById(id) {
    if(this.id)
    {
      this.adService.findItemById(this.id)
      .pipe(first())
      .subscribe(res => {
        if(res.success == "true")
        {
          this.item = res.data;
          this.itemUpdate = this.item;
          console.log(this.item.id);
        }
        else
        {
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
          this.selectedImg = this.attachFiles[0].image;
          this.imageUploaded = this.attachFiles[0].image;
        }
        else {
          this.error = res.message
        }
      }, err => {
        console.log(err)
      });  

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
          .get('imagecf').setValue({
            filename: file.name,
            filetype: file.type,
            value: "data:" + file.type + ";base64," + (reader.result as string).split(',')[1]
          })
      };
    }
 
  }

}
