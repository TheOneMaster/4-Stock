import { Image } from "../gql/gql";

/**
 * Returns an image from an array of images based on the type of the image.
 * @param images Array of images
 * @param type The type of the image to be returned as a string. If any image is acceptable, pass "any" to the function
 * @returns Image with url
 */
export function getImageByType<Type extends Pick<Image, "url">>(images: Type[], type: "any"): Type | Pick<Image, "url">;
export function getImageByType<Type extends Pick<Image, "type" | "url">>(images: Type[], type: string | string[]): Type | Pick<Image, "url">;
export function getImageByType<Type extends Pick<Image, "type" | "url">>(
    images: Type[],
    type: string | string[]
): Type | Pick<Image, "url"> {
    const finalImage = images.reduce<Type | null>((prev, cur) => {
        let typeMatch: boolean
        if (typeof type === "string") {
            if (type === "any") {
                typeMatch = true;
            } else {
                typeMatch = cur.type === type;
            }
        } else {
            typeMatch = type.includes(cur.type ?? "");
        }

        if (typeMatch) return cur
        return prev
    }, null)

    if (finalImage) return finalImage

    return { url: "" }
}
