import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceService } from '../ad-service/user-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Items } from '../../models/Items';
import { AttachFile } from '../../models/Attach_File';
import { Cart_Item } from '../../models/Cart_Item';
import { first } from 'rxjs/operators';
import { HeaderComponent } from '../../app/header/header.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css',
    '../../assets/member/css/style.css',
    '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/member/css/lightbox.css',
    '../../assets/member/css/slider.css',
    '../../assets/member/css/util.css',
    '../../assets/admin/assets/css/bootstrap.min.css'
  ]
})
export class CartComponent implements OnInit {
  cartItem: Cart_Item[];
  email: string = "";
  total : number;
  cart : any;
  quantity:number;
  form: FormGroup;
  imgCart:string;
  constructor(private router: Router, private userService: UserServiceService,private fb: FormBuilder,
    private header:HeaderComponent) {
    this.quantity = 0 ;
    this.total = 0;
    this.cart = new Cart_Item();
    header.ngOnInit();

    this.form = this.fb.group({
      name: ['', Validators.required],
      quantityItem: null,
      formQuantity: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    });
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.getCartITem();

    this.header.ngOnInit();
  }
  getCartITem() {
    this.userService.findCartItem(this.email)
      .subscribe(res => {
        if (res.success == "true") {

          this.cartItem = res.data;
          this.total = 0;
          if(this.cartItem!=null){
            for(var i = 0 ;i<this.cartItem.length;i++)
            {
              console.log("quantity " + this.cartItem[i].quantity);
              console.log("price " + this.cartItem[i].price);
              this.total = this.total + this.cartItem[i].quantity * this.cartItem[i].price;
            }
          }
        }
      }, err => {
   
        console.log( this.header.imgCart.toString());
        this.header.imgCart="../../assets/member/images/shopping.png";
        console.log(err.message)
        this.total = 0;
        this.cartItem = null;
      });

  }
  
  UpdateQuantity(id,quantity) {
    //this.quantity = this.form.get('quantityItem').value;
    console.log(quantity);
    if(this.email){
      this.userService.createCart(id,this.email,quantity)
        .pipe(first())
        .subscribe(res => {
          alert("Sữa thành công !!");

          this.getCartITem();
        }, err => {
          console.log(err.message);
        });
    }
    else{
      alert("Bạn phải đăng nhập !!");
      this.router.navigate(['/login'])
    }
  }
  deleteCartItem(id){
    if(this.email){
      this.userService.deleteCartItem(id,this.email)
        .pipe(first())
        .subscribe(res => {
          alert("Xóa thành công !!");
          this.getCartITem();
          location.reload();
         this.router.navigate(['/cart']);
        }, err => {
          console.log(err.message);
        });
    }
    else{
      alert("Bạn phải đăng nhập !!");
      this.router.navigate(['/login'])
    }
  }
  createBill(){
    if(this.email){
      if(this.total != 0){
        this.userService.createBill(this.email)
        .pipe(first())
        .subscribe(res => {

            alert("Thanh toán thành công !!");
            this.getCartITem();
           this.router.navigate(['/cart']);
           location.reload();
         
        }, err => {
          alert("Không có sản phẩm để thanh toán !!");
          console.log(err.message);
        });
      }
      else{
        alert("Không có sản phẩm để thanh toán !!");
      }
     
    }
    else{
      alert("Bạn phải đăng nhập !!");
      this.router.navigate(['/login'])
    }
  }
  onGotoProductDetail(id) {
    this.router.navigate(["/product/detail"], { queryParams: { id: id } });
  }
}
