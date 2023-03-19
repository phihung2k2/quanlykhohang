import { Grid } from "@nextui-org/react";
import React from "react";

import { ContentFolderEnum } from "@/modules/upload-image-richtext/models";

import { TinyEditorCom } from "./tiny-editor-com";

export interface ContentEditorComProps {
    isContent: boolean;
    detail?: string;
    folder: ContentFolderEnum;
    id: number;
    handleSave: (c: string) => void;
}

export const ContentEditorCom: React.FC<ContentEditorComProps> = ({ handleSave, isContent, detail, folder, id }) => {
    return (
        <React.Fragment>
            {isContent ? (
                <TinyEditorCom initialValue={detail} folder={folder} id={id} handleSave={handleSave} />
            ) : (
                <Grid css={{ img: { maxWidth: "100%" } }}>
                    <div dangerouslySetInnerHTML={{ __html: detail || "no data" }}></div>
                </Grid>
            )}
        </React.Fragment>
    );
};
