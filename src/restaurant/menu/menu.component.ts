import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/modal/item';
import { CartService } from '../shared/service/cart.service';
import { ItemService } from '../shared/service/item.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

//   data = JSON.parse(JSON.stringify([{
//     "category" : "soups",
//     "items":[
//       {
//         "name":"hot and sore",
//         "price" : 200,
//         "description" : "served hot"
//       },
//       {
//         "name":"hot and sore",
//         "price" : 200,
//         "description" : "served hot"
//       },
//       {
//         "name":"hot soup",
//         "price" : 50,
//         "description" : "served hot"
//       }
//     ]
// },
// {
//   "category" : "Main Course",
//   "items":[
//     {
//       "name":"poha",
//       "price" : 200,
//       "description" : "served hot"
//     },
//     {
//       "name":"jalebi",
//       "price" : 200,
//       "description" : "served hot"
//     }
//   ]
// }]));

  data : {
    category : string,
    items : Item[]
  }[] = [];

  cart : any[] = [];
  selectCategory: any;
  itemCount: string = "";
  isCart: boolean = false;
  isMenu: boolean = true;

  constructor(private itemService : ItemService,private cartService : CartService) { }

  ngOnInit(): void {
    //this.selectCategory = this.data[0].category;
    this.itemService.getItems().subscribe(res => {
      this.data = [];
      res.forEach(x=>{
        let it = x.payload.doc.data() as  Item;
          let item = this.data.find(x=>{
            return x.category == it.category});
          
          console.log(item?.category == it.category,item);
          if(item?.category == it.category){
            console.log("inside if");
            item.items.push(it);
          }else{
            console.log("inside else");
            let da = {category : it.category , items : [] as Item[]};
            da.items.push(it);
            this.data.push(da);
            this.selectCategory = this.data[0].category;
          }
      });
    });

    console.log(this.data);
  }

  total : number = 0;
  add(item : {
    name: any,
    price : number,
    description : any
  }){

    let i = {it : item, count : 1 };
    let isPresent = this.cart.find(x=>{
      if(x.it.name == item.name){
        x.count++;
        this.total = this.total + item.price;
        return true;
      }
      return false;
    })
    if(!isPresent){ 

      this.cart.push(i);
      let cartLength = this.cart.length;
      this.itemCount = cartLength + ' x Items';
      this.total = this.total + i.it.price;
    }
  }

  placeOrder(){
    let order = {
      total : this.total,
      items : this.cart,
      isPlaced : true
    }
    this.cartService.createOrder(order).then(res=>{});
  }

  updateOrder(){
    this.cartService.updateOrder(this.cart).then();
  }

  select(category : any){
      this.selectCategory = category;
  }

  selectPage(val:any){
    if(val == 'cart'){
      this.isCart = true;
      this.isMenu = false;
    }

    if(val == 'menu'){
      this.isCart = false;
      this.isMenu = true;
    }
  }
}
