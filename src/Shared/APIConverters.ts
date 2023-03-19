import { ImageType } from "../types";


export function getImageByType(images: ImageType[], type: "profile" | "banner"): ImageType {
    return images.reduce((prev, cur) => {
        if (cur.type === type) return cur
        return prev
    }, null)
}
