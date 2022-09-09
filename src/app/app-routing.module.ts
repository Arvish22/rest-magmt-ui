import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from 'src/restaurant/config/config.component';
import { MenuComponent } from 'src/restaurant/menu/menu.component';
import { OrderListComponent } from 'src/restaurant/order-list/order-list.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'order-list', component: OrderListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
