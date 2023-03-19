// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

import { Button } from "@nextui-org/react";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { toast } from "react-toastify";

import { useMutationUploadImageOnRichtex } from "@/modules/upload-image-richtext/api";
import { ContentFolderEnum } from "@/modules/upload-image-richtext/models";
import { getUriImageMedium, logger } from "@/utils";

export interface TinyEditorComProps {
    handleSave?: (c: string) => void;
    loading?: boolean;
    initialValue?: string;
    id?: number;
    folder?: ContentFolderEnum;
}

export const TinyEditorCom: React.FC<TinyEditorComProps> = ({ handleSave, loading, initialValue, id, folder }) => {
    const editorRef: any = useRef<Editor>(null);

    function handleSaveContent() {
        if (handleSave && editorRef.current) {
            handleSave(editorRef.current.getContent());
        }
    }

    const { onMutation } = useMutationUploadImageOnRichtex();

    // notifation
    // const { enqueueSnackbar } = useSnackbar();

    // const uploadSnack = getSnackbarTopRightFunc("info");
    // const successSnack = getSnackbarTopRightFunc("success");
    // const errorSnack = getSnackbarTopRightFunc("error");

    function uploadHandler(callback: any) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.onchange = function (e: any) {
            const file = e.target?.files[0];
            // enqueueSnackbar("image is uploading", uploadSnack);

            toast.info("image is uploading");
            if (!id || !folder) {
                return;
            }
            onMutation(id, folder, file)
                .then((item) => {
                    logger().info("image upload", item.data);

                    if (item.data) {
                        // enqueueSnackbar("image uploaded", successSnack);
                        toast.success("image uploaded");

                        const uri = getUriImageMedium(item.data.uploadImageOnRichtext);
                        callback(uri, { title: file.name });
                    }
                })
                .catch(() => toast.error("image uploaded failure"));
        };
        input.click();
    }

    const isUpload = id && folder;

    return (
        <React.Fragment>
            <Editor
                // tinymceScriptSrc={"jrmxbyq974bdviizsxt4f51mbw9az4d1dfjd0840ya05fxpz" + "/tinymce/tinymce.min.js"}
                apiKey='60q9k77oe7v7ud5xhmyfuge733wcpac1zhszn8motno5qk5l'
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={initialValue}
                // initialValue='<p>This is the initial content of the editor.</p>'
                plugins={"image"}
                init={{
                    height: 500,
                    automatic_uploads: true,

                    file_picker_types: "image",
                    images_replace_blob_uris: false,
                    file_picker_callback: isUpload ? uploadHandler : undefined,
                    plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

                    // toolbar: "tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

                    draggable_modal: true,
                    extended_valid_elements: "*[.*]",

                    external_plugins: { tiny_mce_wiris: "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js" },

                    tinycomments_mode: "embedded",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    skin: false,
                    content_css: false,
                }}
            />

            <div className=' w-full flex justify-center'>
                <Button onClick={handleSaveContent}>Save</Button>
            </div>
            {/* <Stack justifyItems={"center"}>
                <FormButton variant='contained' loading={loading} onClick={handleSaveContent}>
                    Save
                </FormButton>
            </Stack> */}
        </React.Fragment>
    );
};
