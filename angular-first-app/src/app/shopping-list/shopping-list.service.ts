import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Chicken', 4),
        new Ingredient('Broth', 2)
      ];

    private notifySubjects() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.notifySubjects()
    }

    addIngredients(ingreidents: Ingredient[]) {
        this.ingredients.push(...ingreidents);
        this.notifySubjects()
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient
        this.notifySubjects()
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.notifySubjects();
    }
}