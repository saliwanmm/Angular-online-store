export interface FbResponse {
    name: string;
}

export interface Image {
    url: string;
    // інші можливі властивості, наприклад:
    altText?: string;
    width?: number;
    height?: number;
}

export interface Product {
    type: string;
    title: string;
    photo: Image;
    info: string;
    price: number;
    date: Date;
}