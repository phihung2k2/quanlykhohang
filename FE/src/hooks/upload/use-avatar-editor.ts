import { LegacyRef, useRef, useState } from "react";
import AvatarEditor, { Position } from "react-avatar-editor";

import { convertBlobToFile, convertFileToBase64, FILE_TYPE, logger } from "@/utils";

export type UseAvatarEditor = {
    name?: string;
    onSave?: (f: File) => void;
    isImage: boolean;
};

export function useAvatarEditor({ name, onSave, isImage }: UseAvatarEditor) {
    const refAvatar: LegacyRef<AvatarEditor> = useRef(null);
    const [image, setImage] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(null);

    function onSaveImage(file: Blob | null) {
        const fileExport = convertBlobToFile(file, name || "avatar", FILE_TYPE.PNG);
        setImage(fileExport);
        if (fileExport && onSave) {
            logger().info("avatar", fileExport);
            onSave(fileExport);
        }
        convertFileToBase64(file, setImageBase64);
    }

    const [avatar, setAvatar] = useState<any>({
        image: "",
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 250,
        height: 250,
    });

    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(e.target.value);
        setAvatar({ ...avatar, scale });
    };

    const handlePositionChange = (position: Position) => {
        setAvatar({ ...avatar, position });
    };
    const handleSave = () => {
        if (isImage) {
            refAvatar.current?.getImageScaledToCanvas().toBlob(onSaveImage);
        }
    };

    return { refAvatar, image, imageBase64, avatar, handleZoom, handlePositionChange, handleSave };
}
