import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Chicken soup',
            'heals the soul! It cannot hurt',
            'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_913/k%2Farchive%2F7ad08b34d013c250d1ec5a8293adf91c3a0d16c6',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('Broth', 3 )
            
            ]
        ),
        new Recipe(
            'Broccoli Cheddar',
            'had to!',
            'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cheese-Chicken-Soup_EXPS_BFBZ19_42311_E01_17_7b-2.jpg?fit=696,1024',
            [
                new Ingredient('Brocolli', 5),
                new Ingredient('Cheese', 3)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }
}