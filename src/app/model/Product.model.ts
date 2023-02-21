export interface Product {
    id:         number;
    name:       string;
    brandId:    number;
    categoryId: number;
    price:      number;
    image:      string;
    url:        string;
    createdAt:  Date;
    updatedAt:  Date;
    Brand:      Brand;
    Category:   Brand;
}

export interface Brand {
id: any;
name: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toProduct(json: string): Product {
        return JSON.parse(json);
    }

    public static productToJson(value: Product): string {
        return JSON.stringify(value);
    }
}
