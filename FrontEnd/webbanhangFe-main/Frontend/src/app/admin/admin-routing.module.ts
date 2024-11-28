import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductmanagerComponent} from "./components/productmanager/productmanager.component";
import {CategorymanagerComponent} from "./components/categorymanager/categorymanager.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsermanagerComponent} from "./components/usermanager/usermanager.component";
import {BrandmanagerComponent} from "./components/brandmanager/brandmanager.component";
import {OrdermanagerComponent} from "./components/ordermanager/ordermanager.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'product-manager', component: ProductmanagerComponent},
  {path: 'category-manager', component: CategorymanagerComponent},
  {path: 'brand-manager', component: BrandmanagerComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'user-manager', component: UsermanagerComponent},
  {path: 'order-manager', component: OrdermanagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
