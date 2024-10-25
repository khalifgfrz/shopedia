export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: string;
}
