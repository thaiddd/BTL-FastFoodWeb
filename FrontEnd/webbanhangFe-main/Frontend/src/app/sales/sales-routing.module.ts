import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./components/shop/shop.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductsingleComponent} from "./components/productsingle/productsingle.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {AddressComponent} from "./components/address/address.component";
import {ProfileDetailsComponent} from "./components/profile-details/profile-details.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {HomeComponent} from "./components/home/home.component";
import {OrderconfirmedComponent} from "./components/orderconfirmed/orderconfirmed.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'shop/:categoryName', component:ShopComponent},
  {path: 'shop', component:ShopComponent},
  {path: 'product-single/:id', component: ProductsingleComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'order', component: OrdersComponent},
  {path: 'address', component: AddressComponent},
  {path: 'profile-details', component: ProfileDetailsComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'order-confirmed/:id', component: OrderconfirmedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
