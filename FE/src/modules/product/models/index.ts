export interface ProductEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    detail: string;
    thumbnail: string;
    price: number;
    quantity: number;
    status: string;
    createdAt: Date;
    order: number;
    categoryId: number;
    category: CategoriesEntity;
    images: ImageOnProductEntity[];
}

export interface ProductCreateInputDtoI {
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    detail?: string;
}

export interface CategoriesEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    order: number;
    status: string;
}

export interface CategoriesCreateInputDtoI {
    name: string;
    description: string;
}

export interface CreateImageInput {
    productId: number;
    image: File;
}

export interface ImageOnProductEntity {
    id: number;
    image: string;
    productId: number;
    createdAt: Date;
    product: ProductEntity;
}
