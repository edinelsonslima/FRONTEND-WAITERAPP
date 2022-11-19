interface Product {
  name: string;
  price: number;
  imagePath: string;
}

interface Products {
  _id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  _id: string;
  table: string;
  products: Products[];
  status: 'WAITING'| 'IN_PRODUCTION'| 'DONE';
}
