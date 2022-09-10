import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/modal/item';
import { Order } from '../shared/modal/order';
import { Table } from '../shared/modal/table';
import { CartService } from '../shared/service/cart.service';
import { ItemService } from '../shared/service/item.service';
import { TableService } from '../shared/service/table.service';

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

  cart : {it : Item, count : number }[] = [];
  selectCategory: any;
  itemCount: string = "";
  isCart: boolean = false;
  isMenu: boolean = true;
  tableNo: any;
  table : Table = {
    isAvailbe : true,
    table : 0
  };

  order : Order = {
    id : null,
    total : 0,
    items : this.cart,
    isPlaced : true,
    isFinished : false,
    table : this.table
  }

  constructor(private itemService : ItemService,
    private cartService : CartService,
    private route: ActivatedRoute,
    private tableService: TableService) { 
    this.tableNo = this.route.snapshot.params?.['table'];

    this.tableService.getTables().subscribe(res =>{

      res.forEach((x)=>{
        
        let data = x.payload.doc.data() as Table;
        if(data.table == this.tableNo){
          this.table = data;
        }
    });
  });
}

  ngOnInit(): void {
    
    //this.selectCategory = this.data[0].category;

    this.cartService.getOrder().subscribe(res=>{
      res.forEach(x=>{
        let ord = x.payload.doc.data() as Order;
        if(ord.table == this.tableNo && !ord.isFinished){
          console.log(ord);
              this.order = ord;
        }
      });
    })
    
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
  add(item : Item){

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

      this.cart.push( i );
      let cartLength = this.cart.length;
      this.itemCount = cartLength + ' x Items';
      this.total = this.total + i.it.price;
    }
  }

  placeOrder(){
    let order : Order = {
      id : null,
      total : this.total,
      items : this.cart,
      isPlaced : true,
      isFinished : false,
      table : this.table
    }

    this.cartService.createOrder(order).then(res=>{
      console.log(res.id);
      this.order.id = res.id;
    });

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

  finishOrder(){
    console.log(this.order);
    this.order.isFinished = true;
    this.cartService.updateOrder(this.order.id);
  }
}
