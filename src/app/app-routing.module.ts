import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewComponent} from './product-view/product-view.component';
import { CartComponent } from './cart/cart.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminAccountInfoComponent } from './admin-account-info/admin-account-info.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { AdminTypeComponent } from './admin-type/admin-type.component';
import { AdminTypeAddComponent } from './admin-type-add/admin-type-add.component';
import { AdminTypeDetailComponent } from './admin-type-detail/admin-type-detail.component';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { AdminBillDetailComponent } from './admin-bill-detail/admin-bill-detail.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '' ,component: IndexComponent },
  { path: 'index' ,component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/view', component: ProductViewComponent },
  { path: 'product/detail', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent},
  { path: 'admin/index', component: AdminIndexComponent },
  { path: 'admin/account-info', component: AdminAccountInfoComponent },
  { path: 'admin/type', component: AdminTypeComponent },
  { path: 'admin/type/add', component: AdminTypeAddComponent },
  { path: 'admin/type/detail', component: AdminTypeDetailComponent },
  { path: 'admin/member', component: AdminMemberComponent },
  { path: 'admin/bill', component: AdminBillComponent },
  { path: 'admin/bill/detail', component: AdminBillDetailComponent }

];
@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
