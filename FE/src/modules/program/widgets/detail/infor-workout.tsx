import { useBoolean } from "ahooks";
import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { BadgeStyle } from "@/components/badge/badge-style";
import { TinyEditorCom } from "@/components/editor";
import { ContentEditorCom } from "@/components/editor/content-editor-com";
import { NameInfor } from "@/components/item/infor/name-infor";
import { ContentFolderEnum } from "@/modules/upload-image-richtext/models";
import { DashboardViewDetail } from "@/widgets";

import { useMutationUpdateWorkout } from "../../api/api-workout";
import { WorkoutEntity } from "../../models";
import { ModalCuWorkout } from "../modal";

export interface InforWorkoutProps {
    data?: WorkoutEntity;
}

export const InforWorkout: React.FC<InforWorkoutProps> = ({ data }) => {
    const { modalOnOpen } = useModalStore();
    const { onUpdate } = useMutationUpdateWorkout();
    const [content, onContent] = useBoolean();

    return (
        <DashboardViewDetail.Body
            first={
                <DashboardViewDetail.Paper
                    title='Infor'
                    buttons={[
                        {
                            name: "Edit",
                            onClick: () =>
                                modalOnOpen(<ModalCuWorkout {...data} programIdCreate={data?.programId || 0} />),
                        },
                    ]}
                >
                    <NameInfor name={"Name"} value={data?.name} />
                    <NameInfor name={"slug"} value={data?.slug} />

                    <NameInfor name={"description"} value={data?.description} />
                    <NameInfor name={"program"} value={data?.program?.name?.toString()} />

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
                            folder={ContentFolderEnum.workout}
                            id={data?.id}
                            handleSave={(c) => onUpdate({ id: data.id, detail: c })}
                        />
                    )}
                </DashboardViewDetail.Paper>
            }
        />
    );
};
