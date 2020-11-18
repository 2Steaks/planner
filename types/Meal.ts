/** @format */

import { RecipeType } from './Recipe';

export interface MealType {
  type: string;
  recipe: Pick<RecipeType, 'id' | 'title' | 'calories' | 'image'>;
}
