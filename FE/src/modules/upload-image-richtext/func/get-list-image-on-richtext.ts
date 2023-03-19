import { ImageOnRichtextI } from "../models";

export function getListImageOnRichText(data: ImageOnRichtextI[]) {
    const list = data || [];

    return list.map((item) => {
        return {
            name: item.public_id,
        };
    });
}

export type ListImageOnRichTextType = ReturnType<typeof getListImageOnRichText>;
