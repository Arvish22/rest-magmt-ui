import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/restaurant/shared/modal/category';
import { Item } from 'src/restaurant/shared/modal/item';
import { CategoryService } from 'src/restaurant/shared/service/category.service';
import { ItemService } from 'src/restaurant/shared/service/item.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {
  items: Item[] = [];

  itemForm: FormGroup = new FormGroup({});
  item: Item = {
    name: "",
    id: null,
    description: "",
    price: 0,
    category: ""
  }
  categories: Category[] = [];

  constructor(private itemService: ItemService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl(this.item.name, [
        Validators.required,
        Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      price: new FormControl(this.item.price),
      description: new FormControl(this.item.description),
      category: new FormControl(this.item.category)
    });

    this.categoryService.getCategory().subscribe(res => {
      this.categories = [];
      res.forEach(x => {
        let categry = x.payload.doc.data() as Category;
        categry.id = x.payload.doc.id;
        this.categories.push(categry);

        console.log(categry, x.payload.doc.data());
      });
    });
  }

  createItems(data: Item) {
    console.log("__________________", data);
    this.itemService.createItems(data);
  }

  getItems() {
    this.itemService.getItems().subscribe(res => {
      this.items = [];
      res.forEach(
        x => {
          let itm = x.payload.doc.data() as Item;
          itm.id = x.payload.doc.id;

          this.items.push(itm);
        }
      );
    });
  }

  updateItem(data: Item) {
  }

  deleteItem(data: any) {
  }

}
