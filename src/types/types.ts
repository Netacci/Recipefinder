

export type Ingredient = string;
export type Instruction = string;

export interface Recipe {
  name: string;
  image: string;
  rating: number;
  prepTime: string;
  cookTime: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface UploadForm {
  name: string;
  ingredients: string;
  instructions: string;
}