import { Button, Modal } from "@nextui-org/react";
import { useBoolean } from "ahooks";
import React from "react";
import ReactAvatarEditor from "react-avatar-editor";

import { useAvatarEditor, useInputUpload } from "@/hooks";
import { uploadImgConfig } from "@/utils";

import { IconButton } from "../button/icon-button";

export interface AvatarUploadProps {
    name?: string;
    onSave?: (f: File) => void;
    imageUri?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ name, onSave, imageUri }) => {
    const [modal, onModal] = useBoolean();

    const upload = useInputUpload();

    const { refAvatar, avatar, handleZoom, handlePositionChange, handleSave } = useAvatarEditor({
        onSave,
        name,
        isImage: !!upload.imgUrl,
    });

    /**
     * If the onSave variable is true, then reset the upload component and set the onModal variable to
     * true
     */
    function handleOpenUploadModal() {
        if (onSave) {
            upload.handleReset();
            onModal.setTrue();
        }
    }

    return (
        <React.Fragment>
            <div className=' relative'>
                <img src={imageUri} style={{ width: "168px", height: "168px", border: "5px solid white" }} />
                {!!onSave && (
                    <div className=' w-full flex justify-center'>
                        <IconButton onClick={handleOpenUploadModal}>Change</IconButton>
                        {/* <IconButton
                            onClick={handleOpenUploadModal}
                            sx={{ bgcolor: "white", ":hover": { bgcolor: "white" } }}
                        >
                            <CameraAltIcon />
                        </IconButton> */}
                    </div>
                )}
            </div>

            <Modal
                width='400px'
                className=' w-[90%] mobile:w-[100%] m-auto'
                closeButton
                aria-labelledby='accessibility'
                aria-label='dsad'
                open={modal}
                onClose={onModal.setFalse}
            >
                <Modal.Body>
                    {upload.imgUrl && (
                        <div className=' flex justify-center items-center flex-col space-y-5'>
                            <ReactAvatarEditor
                                ref={refAvatar}
                                scale={parseFloat(avatar.scale.toString())}
                                width={avatar.width}
                                height={avatar.height}
                                position={avatar.position}
                                onPositionChange={handlePositionChange}
                                rotate={parseFloat(avatar.rotate.toString())}
                                borderRadius={avatar.width / (100 / avatar.borderRadius)}
                                image={upload.imgUrl}
                                className='editor-canvas'
                                color={[1, 1, 1, 0.5]}
                                border={2}
                                style={{ borderBottom: "1px solid black" }}
                            />
                            <input
                                id='default-range'
                                type='range'
                                step={0.01}
                                min={1}
                                max={2}
                                onChange={handleZoom}
                                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                            />
                        </div>
                    )}
                    <Button onClick={upload.handleClick}>Upload Image</Button>

                    {upload.imgUrl && (
                        <Button
                            onClick={handleSave}
                            // onClick={() => handleSaveTwo(onSave)}
                        >
                            Save
                        </Button>
                    )}
                    <Button onClick={onModal.setFalse}>Cancel</Button>
                    <input
                        name='image'
                        type={"file"}
                        style={{ display: "none" }}
                        ref={upload.hiddenFileInput}
                        onChange={upload.handleChange}
                        accept={uploadImgConfig}
                    />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
