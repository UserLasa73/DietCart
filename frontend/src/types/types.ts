export type DietType = 
  | 'Diabetic-Friendly'
  | 'Nut-Free'
  | 'Dairy-Free'
  | 'Gluten-Free'
  | 'Soy-Free'
  | 'Egg-Free'
  | 'Heart-Healthy'
  | 'Weight Management'
  | 'Gut Health'
  | 'Kidney-Friendly'
  | 'Liver Support'
  | 'Hypertension-Safe'
  | 'PCOS/PCOD Support'
  | 'Senior Nutrition'
  | 'Children\'s Nutrition'
  | 'Immune Boosters'
  | 'Thyroid-Supportive'
  | 'Pregnancy & Postpartum'
  | 'Vegan Medical Diets';

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dietTypes: DietType[];
  includedItems: GroceryItem[];
}

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  dietTypes: DietType[];
  quantity?: number;
}