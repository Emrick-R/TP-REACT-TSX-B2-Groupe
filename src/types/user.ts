export interface UserAddress {
    address: string| null;
    city: string| null;
    postalCode: string| null;
    country: string| null;
}

export interface UserCompany {
    name: string| null
    department: string| null;
    title: string| null;
}

export interface User {
    id: number | null;
    firstName: string| null;
    lastName: string| null;
    username: string| null;
    email: string| null;
    phone: string| null;
    age: number| null;
    gender: 'male' | 'female' | string| null;
    birthDate: string| null;
    image: string| null;
    role: 'admin' | 'user' | string| null;
    address?: UserAddress;
    company?: UserCompany;
}