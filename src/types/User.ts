/** @format */

interface RecipeType {
  id: number;
}
interface PlanType {
  id: number;
}
interface ShoppingType {
  id: number;
}

export interface UserType {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  calories?: number;
  avatar?: string;
  recipes?: RecipeType[];
  plans?: PlanType[];
  shoppingLists?: ShoppingType[];
}
