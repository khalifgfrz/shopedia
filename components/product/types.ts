export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface FilterSettings {
  product_name: string;
  selectedCategories: string[];
  sortBy: string;
}
