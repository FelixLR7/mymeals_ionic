import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  title = "Listas";
  type = "list";
  searchValue = "";
  searchColumn = "name";

  lists = new Observable();

  constructor() { 
    
  }

  ngOnInit() {
  }

}
