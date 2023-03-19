import { UserEntity } from "@/modules/user/models";

export interface BillEntity {
    id: number;
    billProduct: string;
    billInfo: string;
    userId: number;
    status: string;
    createdAt: Date;
    orderId: string;
    user?: UserEntity;
}

export interface BillProductItemEntity {
    id: number;
    description: string;
    name: string;
    quantity: number;
    thumbnail: string;
    unit_amount: {
        currency_code: string;
        value: number;
    };
}

export interface BillProductEntity {
    userId: number;
    items: BillProductItemEntity[];
}
