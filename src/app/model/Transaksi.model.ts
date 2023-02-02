export interface Transaksi {
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
  firstName: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTransaksi(json: string): Transaksi {
      return JSON.parse(json);
  }

  public static transaksiToJson(value: Transaksi): string {
      return JSON.stringify(value);
  }
}
