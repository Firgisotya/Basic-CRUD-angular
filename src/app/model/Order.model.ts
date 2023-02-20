export interface Order {
  id:        number;
  userId:    number;
  productId: number;
  qty:       number;
  total:     number;
  createdAt: Date;
  updatedAt: Date;
  User:      User;
  Product:   Product;
}

export interface Product {
  name: string;
}

export interface User {
  username: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrder(json: string): Order {
      return JSON.parse(json);
  }

  public static orderToJson(value: Order): string {
      return JSON.stringify(value);
  }
}
