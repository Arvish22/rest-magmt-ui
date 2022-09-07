import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { OrderListComponent } from './order-list/order-list.component';



@NgModule({
  declarations: [
    RestaurantComponent,
    DashboardComponent,
    MenuComponent,
    OrderBookComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RestaurantModule { }
