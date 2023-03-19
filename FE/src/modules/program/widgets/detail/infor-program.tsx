import { useBoolean } from "ahooks";
import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { BadgeStyle } from "@/components/badge/badge-style";
import { TinyEditorCom } from "@/components/editor";
import { ContentEditorCom } from "@/components/editor/content-editor-com";
import { NameInfor } from "@/components/item/infor/name-infor";
import { ContentFolderEnum } from "@/modules/upload-image-richtext/models";
import { DashboardViewDetail } from "@/widgets";

import { useMutationUpdateProgram } from "../../api";
import { ProgramEntity } from "../../models";
import { ModalCuProgram } from "../modal";

export interface InforProgramProps {
    data?: ProgramEntity;
}

export const InforProgram: React.FC<InforProgramProps> = ({ data }) => {
    const { modalOnOpen } = useModalStore();
    const { onUpdate } = useMutationUpdateProgram();
    const [content, onContent] = useBoolean();

    return (
        <DashboardViewDetail.Body
            first={
                <DashboardViewDetail.Paper
                    title='Infor'
                    buttons={[{ name: "Edit", onClick: () => modalOnOpen(<ModalCuProgram {...data} />) }]}
                >
                    <NameInfor name={"Name"} value={data?.name} />
                    <NameInfor name={"slug"} value={data?.slug} />

                    <NameInfor name={"description"} value={data?.description} />
                    <NameInfor name={"type"} value={data?.type?.name.toString()} />

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
                        <ContentEditorCom
                            isContent={content}
                            detail={data.detail}
                            folder={ContentFolderEnum.program}
                            id={data?.id}
                            handleSave={(c) => onUpdate({ id: data.id, detail: c })}
                        />
                    )}
                </DashboardViewDetail.Paper>
            }
        />
    );
};
