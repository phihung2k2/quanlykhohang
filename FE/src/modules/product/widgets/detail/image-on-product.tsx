import { Button, Modal } from "@nextui-org/react";
import { useBoolean } from "ahooks";
import React from "react";
import ReactAvatarEditor from "react-avatar-editor";

import { TableCustom } from "@/components";
import { useAvatarEditor, useInputUpload } from "@/hooks";
import { uploadImgConfig } from "@/utils";
import { DashboardViewDetail } from "@/widgets";

import { useMutationCreateImageOnProduct } from "../../api/api-image-on-product";
import { useTableImageOnProduct } from "../../hooks/table/use-table-image-on-product";
import { ProductEntity } from "../../models";

export interface ImageOnProductProps {
    data: ProductEntity;
}

export const ImageOnProduct: React.FC<ImageOnProductProps> = ({ data }) => {
    const [modal, onModal] = useBoolean();
    const { onCreate } = useMutationCreateImageOnProduct();

    const upload = useInputUpload();

    const { refAvatar, avatar, handleZoom, handlePositionChange, handleSave } = useAvatarEditor({
        onSave: (file) => onCreate({ productId: data.id, image: file }),
        name: "product",
        isImage: !!upload.imgUrl,
    });

    const { columns, rows } = useTableImageOnProduct(data.images || []);

    return (
        <div className=' w-full max-w-[800px] m-auto'>
            <DashboardViewDetail.Paper buttons={[{ name: "Upload Image", onClick: onModal.setTrue }]} title='Image'>
                <TableCustom columns={columns} rows={rows} minWidth={"600px"} />
            </DashboardViewDetail.Paper>
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
                    {upload.imgUrl && <Button onClick={handleSave}>Save</Button>}

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
        </div>
    );
};
