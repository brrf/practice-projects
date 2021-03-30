import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chicken soup', 'heals the soul! It cannot hurt', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2Farchive%2F7ad08b34d013c250d1ec5a8293adf91c3a0d16c6'),
    new Recipe('Broccoli Cheddar', 'had to!', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cheese-Chicken-Soup_EXPS_BFBZ19_42311_E01_17_7b-2.jpg?fit=696,1024')
  ];
  @Output() bubbleRecipe = new EventEmitter<Recipe>()

  constructor() { }

  ngOnInit(): void {
  }

  bubbleSelectedRecipe(recipe: Recipe) {
    this.bubbleRecipe.emit(recipe);
  }

}
