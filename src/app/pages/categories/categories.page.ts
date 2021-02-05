import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  title = "Categorías";

  c1 = new Category(1, "Carne");
  c2 = new Category(2, "Pescado");
  c3 = new Category(3, "Fruta");
  c4 = new Category(4, "Pasta");
  c5 = new Category(5, "Legumbres");

  categories: Category[] = [this.c1, this.c2, this.c3, this.c4, this.c5];

  constructor() { }

  ngOnInit() {
  }

}
