export interface Property {
  id:            string;
  subcategoryId: string;
  name:          string;
  isDeleted:     boolean;
  options:       PropertyOption[];
}


export interface PropertyPost {
  subcategoryId: string;
  name:          string;
}

export interface PropertyPut {
  subcategoryId: string;
  name:          string;
  id:          string;
}

export interface PropertyOption {
  id:                 string;
  categoryPropertyId: string;
  text:               string;
  image?:             string;
  isDeleted:          boolean;
}
