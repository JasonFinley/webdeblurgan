"use client"

import { useEffect, useState } from "react";

const CropImage = ({ url, ratio = 4 / 3, imgProps = {} }) => {

    const [croppedSrc, setCroppedSrc] = useState(null);

    useEffect( () => {

        if (!url) return;

        const img = new Image();
        img.crossOrigin = "anonymous"; // 若是遠端圖片避免 CORS 問題
        img.src = url;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const imgRatio = img.width / img.height;

            let cropWidth, cropHeight, startX, startY;

            if (imgRatio > ratio) {
                // 圖片太寬 → 裁左右
                cropHeight = img.height;
                cropWidth = img.height * ratio;
                startX = (img.width - cropWidth) / 2;
                startY = 0;
            } else {
                // 圖片太高 → 裁上下
                cropWidth = img.width;
                cropHeight = img.width / ratio;
                startX = 0;
                startY = (img.height - cropHeight) / 2;
            }

            canvas.width = cropWidth;
            canvas.height = cropHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                img,
                startX,
                startY,
                cropWidth,
                cropHeight,
                0,
                0,
                cropWidth,
                cropHeight
            );

            const newSrc = canvas.toDataURL("image/jpeg", 0.9);
            setCroppedSrc(newSrc);
        };
    }, [url, ratio]);

    if (!croppedSrc) return <div>Loading...</div>;
    return <img src={croppedSrc} alt="cropped" {...imgProps} />;
};

export default CropImage;
