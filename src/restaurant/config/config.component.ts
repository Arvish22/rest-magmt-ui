import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../shared/modal/category';
import { CategoryService } from '../shared/service/category.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  category : Category = {
    name : "",
    id : null
  }
  categories : Category[] = [];

  constructor(private categoryService: CategoryService) { }

  
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name, [
        Validators.required,
        Validators.minLength(4),
       //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
    });
    
    this.categoryService.getCategory().subscribe(res=>{
      this.categories = [];
        res.forEach(x=>{
            let categry = x.payload.doc.data() as Category;
            categry.id = x.payload.doc.id;
            this.categories.push(categry);

            console.log(categry,x.payload.doc.data());
        });
    });
  }

  get name() { return this.categoryForm.get('name'); }

  onSubmit(val : Category){
    this.categoryService.createCategory(val).finally(()=>{
      console.log("added");
    });
  }

  del(id : any){
    console.log("**");
    this.categoryService.deleteCategory(id);
  }

}

function forbiddenNameValidator(arg0: RegExp): any {
  throw new Error('Function not implemented.');
}

