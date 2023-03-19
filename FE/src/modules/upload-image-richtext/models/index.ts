export enum ContentFolderEnum {
    chapter = "chapter",
    teacher = "teacher",
    firstTag = "firstTag",
    secondTag = "secondTag",
    thirdTag = "thirdTag",
    course = "course",
    product = "product",
    program = "program",
    forum = "forum",
    workout = "workout",
}

export interface ImageOnRichtextI {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: Date;
    bytes: number;
    width: number;
    height: number;
    folder: string;
    url: string;
    secure_url: string;
}

export interface ListImageOnRichtextI {
    resources: ImageOnRichtextI[];
}
