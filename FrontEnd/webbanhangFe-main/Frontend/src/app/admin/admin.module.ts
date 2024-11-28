import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {EditprofileComponent} from "../common/editprofile/editprofile.component";
import { ProductmanagerComponent } from './components/productmanager/productmanager.component';
import { CategorymanagerComponent } from './components/categorymanager/categorymanager.component';
import {ProductformComponent} from "../common/productform/productform.component";
import { SettingsComponent } from './components/settings/settings.component';
import {AdminComponent} from "./admin.component";
import "./../../assets/js/app.js"
import "./../../assets/js/raphael.min.js"
import "./../../assets/js/waves.min.js"
import "./../../assets/js/jquery.slimscroll.js"
import "./../../assets/js/jquery.min.js"
import "./../../assets/js/bootstrap.bundle.min.js"
import "./../../assets/js/metismenu.min.js";
import "./../../assets/canvasjs.min.js"
import { UsermanagerComponent } from './components/usermanager/usermanager.component'
import {UserformComponent} from "../common/userform/userform.component";
import {NgxLoadingModule} from "ngx-loading";
import {FormsModule} from "@angular/forms";
import {CategoryformComponent} from "../common/categoryform/categoryform.component";
import { BrandmanagerComponent } from './components/brandmanager/brandmanager.component';
import {BrandformComponent} from "../common/brandform/brandform.component";
import { OrdermanagerComponent } from './components/ordermanager/ordermanager.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorIntlCro} from "../services/onChangPageSerVice/MatPaginatorIntlCro";
const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
    declarations: [
        TopbarComponent,
        LeftbarComponent,
        DashboardComponent,
      EditprofileComponent,
      ProductmanagerComponent,
      CategorymanagerComponent,
      ProductformComponent,
      SettingsComponent,
      AdminComponent,
      UsermanagerComponent,
      UserformComponent,
      CategoryformComponent,
      BrandmanagerComponent,
      BrandformComponent,
      OrdermanagerComponent,
      CanvasJSChart,

    ],
  exports: [
    TopbarComponent,
    LeftbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MatNativeDateModule,
    NgOptimizedImage,
    NgxLoadingModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
  ],
  providers: [
    Title,
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},

  ],
})
export class AdminModule {

}
