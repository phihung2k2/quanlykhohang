import { useEffect, useRef, useState } from "react";

import { checkType, convertFileToBase64, logger } from "@/utils";

export const maxSizeImage = 10_000_000;

export const useInputUpload = (handle?: any) => {
    const [imgUrl, setImgUrl] = useState<any>(null);

    const [imgBase64, setImgBase64] = useState<any>(null);

    const hiddenFileInput: any = useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange2 = (event: any) => {
        const fileUploaded = event.target.files[0];
        if (handle) {
            handle(fileUploaded);
        }
        setImgUrl(fileUploaded);
    };

    const handleChange = (event: any) => {
        const size = event.target.files[0].size;
        const type = event.target.files[0].type;

        const isJpgOrPng = checkType(type);

        if (!isJpgOrPng) {
            return logger().error("Image ", "Image not type");
        }

        if (maxSizeImage < size) {
            return logger().error("Image ", "Image not size");
        } else {
            // const snack = getSnackbarTopRightFunc("success");

            // formik.setFieldValue(event.target.name, event.target.files[0]);
            handleChange2(event);
            // return enqueueSnackbar("Image upload success", snack);

            return logger().silly("Image ", "Image  success");
        }
    };

    const handleReset = () => {
        setImgUrl(null);
    };

    useEffect(() => {
        if (imgUrl) {
            convertFileToBase64(imgUrl, setImgBase64);
        }
    }, [imgUrl]);

    return {
        imgUrl,
        handleClick,
        hiddenFileInput,
        handleChange,
        setImgUrl,
        handleReset,
        imgBase64,
    };
};
