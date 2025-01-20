export interface Product {
  id:               string;
  name:             string;
  price:            number;
  wholesalePrice:   number;
  maxOrder:         number;
  imageUrlOriginal: string;
  imageUrlSmall:    string;
}
export interface ProductPost {
  image:         File | null;
  name:             string;
  price:            string;
  wholesalePrice:   string;
  maxOrder:         string;
  subcategoryId: string;
}
