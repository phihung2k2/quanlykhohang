import { Grid } from "@nextui-org/react";
import { useBoolean } from "ahooks";
import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { BadgeStyle } from "@/components/badge/badge-style";
import { TinyEditorCom } from "@/components/editor";
import { NameInfor } from "@/components/item/infor/name-infor";
import { ContentFolderEnum } from "@/modules/upload-image-richtext/models";
import { DashboardViewDetail } from "@/widgets";

import { useMutationUpdateProduct } from "../../api";
import { ProductEntity } from "../../models";
import { ModalCuProduct } from "../modal-cu-product";

export interface InforProfuctProps {
    data?: ProductEntity;
}

export const InforProfuct: React.FC<InforProfuctProps> = ({ data }) => {
    const { modalOnOpen } = useModalStore();
    const { onUpdate } = useMutationUpdateProduct();

    const [content, onContent] = useBoolean();

    return (
        <DashboardViewDetail.Body
            first={
                <DashboardViewDetail.Paper
                    title='Infor'
                    buttons={[{ name: "Edit", onClick: () => modalOnOpen(<ModalCuProduct {...data} />) }]}
                >
                    <NameInfor name={"Name"} value={data?.name} />
                    <NameInfor name={"slug"} value={data?.slug} />

                    <NameInfor name={"description"} value={data?.description} />

                    <NameInfor name={"price"} value={data?.price?.toString()} />
                    <NameInfor name={"quantity"} value={data?.quantity?.toString()} />

                    <NameInfor name={"category"} value={data?.category?.name?.toString()} />

                    <NameInfor
                        name={"status"}
                        value={data?.status}
                        render={(v) => <BadgeStyle type={v}>{v}</BadgeStyle>}
                    />
                </DashboardViewDetail.Paper>
            }
            side={
                <DashboardViewDetail.Paper
                    title='Content'
                    buttons={[
                        { name: "Edit", onClick: onContent.setTrue },
                        { name: "Content", onClick: onContent.setFalse },
                    ]}
                >
                    {data && (
                        <React.Fragment>
                            {content ? (
                                <TinyEditorCom
                                    initialValue={data.detail}
                                    folder={ContentFolderEnum.product}
                                    id={data?.id}
                                    handleSave={(c) => onUpdate({ id: data.id, detail: c })}
                                />
                            ) : (
                                <Grid css={{ img: { maxWidth: "100%" } }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.detail || "no data" }}></div>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                </DashboardViewDetail.Paper>
            }
        />
    );
};
