export interface Order {
  id: string;
  articles: string[];
  installationDate: string;
}

export interface Products {
  id: string;
  productCode: string;
  name: string;
  description: string;
  stock: number;
  unitPrice: number;
}

export interface Tool {
  id: string;
  productCode: string;
  name: string;
  description: string;
  stock: number;
}

export type Product = Products | Tool;