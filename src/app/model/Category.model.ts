export interface Category {
  id:        number;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCategory(json: string): Category {
      return JSON.parse(json);
  }

  public static categoryToJson(value: Category): string {
      return JSON.stringify(value);
  }
}
