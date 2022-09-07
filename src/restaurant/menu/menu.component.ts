import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  data = JSON.parse(JSON.stringify([{
    "category" : "soups",
    "items":[
      {
        "name":"hot and sore",
        "price" : 200,
        "description" : "served hot"
      },
      {
        "name":"hot and sore",
        "price" : 200,
        "description" : "served hot"
      },
      {
        "name":"hot soup",
        "price" : 50,
        "description" : "served hot"
      }
    ]
},
{
  "category" : "Main Course",
  "items":[
    {
      "name":"poha",
      "price" : 200,
      "description" : "served hot"
    },
    {
      "name":"jalebi",
      "price" : 200,
      "description" : "served hot"
    }
  ]
}]));

  cart : any[] = [];
  selectCategory: any;
  itemCount: string = "";
  isCart: boolean = false;
  isMenu: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.selectCategory = this.data[0].category;
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
