export interface FbResponse {
    name: string;
}

export interface User {
    email: string;
    password: string;
}

export interface AuthResponse {
    expiresIn: string;
    idToken: string;
  }

export interface Product {
    id?: string;
    type: string;
    title: string;
    photo: string;
    info: string;
    price: number;
    date: Date;
}

export interface Order {
    id?: string;
    name: string;
    phone: string;
    address: string;
    payment: string;
    price: number;
    date: Date;
    orders: {title: string}[]
}