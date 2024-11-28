import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
var imgApi = "http://localhost:8081/image/";

import { SalesRoutingModule } from './sales-routing.module';
import {ProductsingleComponent} from "./components/productsingle/productsingle.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ShopComponent} from "./components/shop/shop.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ProfileDetailsComponent} from "./components/profile-details/profile-details.component";
import {AddressComponent} from "./components/address/address.component";
import {EditAddressComponent} from "./components/edit-address/edit-address.component";
import {SalesComponent} from "./sales.component";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppModule} from "../app.module";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HomeComponent} from "./components/home/home.component";
import {DialogLoginRequestComponent} from "./components/dialog-login-request/dialog-login-request.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { DeleteCartIndexComponent } from './components/delete-cart-index/delete-cart-index.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {NgxLoadingModule} from "ngx-loading";
import { OrderconfirmedComponent } from './components/orderconfirmed/orderconfirmed.component';





@NgModule({
  declarations: [
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    AddressComponent,
    EditAddressComponent,
    SalesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DialogLoginRequestComponent,
    DeleteCartIndexComponent,
    OrderconfirmedComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    SalesRoutingModule,
    RouterModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientJsonpModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxLoadingModule,
    //
  ]
})
export class SalesModule { }
