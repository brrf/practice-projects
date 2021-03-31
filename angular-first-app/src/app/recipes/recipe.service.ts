import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Chicken soup', 'heals the soul! It cannot hurt', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2Farchive%2F7ad08b34d013c250d1ec5a8293adf91c3a0d16c6'),
        new Recipe('Broccoli Cheddar', 'had to!', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cheese-Chicken-Soup_EXPS_BFBZ19_42311_E01_17_7b-2.jpg?fit=696,1024')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}