export interface Brands {
  message: string;
  brands:  Brands;
}

export interface Brands {
  id:        number;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBrands(json: string): Brands {
      return JSON.parse(json);
  }

  public static brandsToJson(value: Brands): string {
      return JSON.stringify(value);
  }
}
