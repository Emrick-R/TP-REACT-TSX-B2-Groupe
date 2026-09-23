export interface Recipe {
    "id": number;
    "name": string;
    "prepTimeMinutes": number;
    "cookTimeMinutes": number;
    "image": string;
    "ingredients": string[];
    "instructions": string[]
}