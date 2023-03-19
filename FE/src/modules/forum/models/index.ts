export interface ForumEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    detail: string;
    thumbnail: string;
    status: string;
    createdAt: Date;
}

export interface ForumCreateInputDtoI {
    name: string;
    description: string;
    status: string;
    thumbnail?: File;
    detail?: string;
}

export interface CommentEntity {
    id: number;
    forum_id: number;
    user_id: number;
    detail: string;
}
