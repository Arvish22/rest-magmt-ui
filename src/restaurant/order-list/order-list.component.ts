import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  isExpand: any = -1;

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

  clickMe(value : any){
    value.srcElement.innerHTML="Clicked";

  }

  expandOrder(i : any){
    if(this.isExpand == i)
      this.isExpand = -1;
    else
     this.isExpand = i;
  }
}
