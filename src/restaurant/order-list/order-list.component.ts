import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private cartService : CartService) { }

orders : any[] = [];

  ngOnInit(): void {
    this.cartService.getOrder().subscribe(res=>{
      res.forEach(x=>{
        let ord = x.payload.doc.data();
        this.orders.push(ord);
        console.log(this.orders);
      });
    })
  }


}
