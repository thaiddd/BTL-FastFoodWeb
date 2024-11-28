import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalesComponent} from "./sales/sales.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./sales/components/login/login.component";
import {SignupComponent} from "./sales/components/signup/signup.component";

const routes: Routes = [
  {
    path: '', // route mặc định (trang chủ)
    component: SalesComponent, // Component hiển thị cho trang chủ
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    // lazy load để tối ưu (chỉ tải khi ng dùng truy cập vao route tuong ung)
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // đăng kí ở cấp root
  exports: [RouterModule] // để các module khác có the sử dụng các directives của router như: routerLink routerLinkActive router-outlet
})
export class AppRoutingModule { }
