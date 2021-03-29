import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chicken soup', 'heals the soul! It cannot hurt', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2Farchive%2F7ad08b34d013c250d1ec5a8293adf91c3a0d16c6'),
    new Recipe('Chicken soup', 'heals the soul! It cannot hurt at all!', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2Farchive%2F7ad08b34d013c250d1ec5a8293adf91c3a0d16c6')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
