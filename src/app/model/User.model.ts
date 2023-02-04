export interface User {
  id:        number;
  firstName: string;
  lastName:  string;
  email:     string;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUser(json: string): User {
      return JSON.parse(json);
  }

  public static userToJson(value: User): string {
      return JSON.stringify(value);
  }
}
