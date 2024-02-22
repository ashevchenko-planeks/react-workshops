export interface Product {
  id?: number;
  name: string;
  price: number;
  category: "Category 1" | "Category 2";
  subcategory?: "Subcategory 1" | "Subcategory 2";
}

export const categories = ["Category 1", "Category 2"];
export const subcategories = ["Subcategory 1", "Subcategory 2"];
