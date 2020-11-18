/** @format */

export interface RecipeIngredientType {
  original: string;
}

export interface RecipeMethodType {
  instruction: string;
}

export interface RecipeType {
  id?: string;
  author: any;
  calories?: number;
  description?: string;
  image?: string;
  ingredients?: RecipeIngredientType[];
  method?: RecipeMethodType[];
  serving?: number;
  title?: string;
  tags?: string[];
}
