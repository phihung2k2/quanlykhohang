export interface ResponseProps<T> {
    success: string;
    code: number;
    locale: string;
    message: string;
    data: T;
}

export interface MetaProps {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface DataListResponseProps<T> {
    data: T[];
    link: any;
    meta: MetaProps;
}

export interface IResponseCheck {
    message: string;
    check: boolean;
}

export type MetaGqlType = {
    currentPage: number;
    total: number;
    perPage: number;
    count: number;
};

export interface ListGqlResponseI<TData> {
    data: TData[];
    meta: MetaGqlType;
}

export interface ListQueryI {
    page: number;
    perPage: number;
    createAt?: "asc" | "desc";
}

export interface ListIdInputI {
    id: number;
}
