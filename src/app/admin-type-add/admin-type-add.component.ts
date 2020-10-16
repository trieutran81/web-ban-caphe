import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdServiceService } from '../ad-service/ad-service.service';
import { FormBuilder ,FormGroup, Validators , FormControl} from '@angular/forms';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Types } from '../../models/Types';
import { first } from 'rxjs/operators'
@Component({
  selector: 'app-admin-type-add',
  templateUrl: './admin-type-add.component.html',
  styleUrls: ['./admin-type-add.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
  '../../assets/admin/assets/css/animate.min.css',
  '../../assets/admin/assets/css/paper-dashboard.css',
  '../../assets/admin/assets/css/demo.css',
  '../../assets/admin/assets/css/themify-icons.css',
  '../../assets/admin/assets/css/pgwslider.css',
  '../../assets/admin/assets/css/pgwslider.min.css']
})
export class AdminTypeAddComponent implements OnInit {
  selectedImg : string = ""
  item:Items;
  email:string;
  attachFile:AttachFile;
  error : string;
  formImage: FormGroup;
  image: string = "";
  imageUploaded: string = "";
  imageUrl: string = "/assets/admin/img/default-image.png";
  constructor(private router: Router,private adService:AdServiceService, private fb: FormBuilder) {
    
    this.item = new Items();
    this.item.status = 1;
    this.attachFile = new AttachFile();
    this.formImage = this.fb.group({
      name: ['', Validators.required],
      avatar: null,
      formName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      formPrice: new FormControl({ value: '' }, Validators.compose([Validators.required])),
     formDescription: new FormControl({ value: '' }, Validators.compose([Validators.required])),
     formTypesId: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    });
   }
  fileToUpload: File = null;
  ngOnInit() {
    this.email = localStorage.getItem("email");
    if(!this.email)
    {
      alert("Vui lòng đăng nhập!!");
      this.router.navigate(["/login"]);
    }
  }
  onLogout(){
    localStorage.clear()
    this.router.navigate(["/login"]);
  }
  createItem() {


    this.adService.createItem(this.item)
    .pipe(first())
    .subscribe(res => {
      if(res.success == "true"){
        console.log(res.success);
        this.attachFile.itemId = res.data.id;
        this.onSaveImage();
        this.item.name = "";
        this.item.typesId = null;
        this.item.price = null;
        this.item.description= "";
        alert("Thêm thành công !!");
        this.router.navigate(['/admin/type/add']);
      }
      
     //alert("Thêm thành công!!");
      // this.router.navigate(['/admin/type/add']);
    }, err => {
      alert("Phải điền đày đủ thông tin !!");
      this.error = err.messger;
    });
    
  }


  onSaveImage(){
    this.imageUploaded = this.formImage.get('avatar').value.value;
    this.attachFile.image = this.imageUploaded;
    this.adService.addImage(this.attachFile).pipe(first())
    .subscribe(res=>{
      this.attachFile.id = null;
      this.attachFile.image="";
      this.attachFile.itemId=null;
      this.imageUploaded = "";
     this.selectedImg="";
    },
    err=>{
        alert("Không them được ảnh !!!");
        this.error = err.messger;
    });
  }
  onChangedImage(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
       reader.onload = () => {
        this.image = "data:" + file.type + ";base64," + (reader.result as string).split(',')[1];
        this.selectedImg = this.image;
        this.formImage
        .get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: "data:" + file.type + ";base64," + (reader.result as string).split(',')[1]
        })
      };
    }
  }
}
