import { Image } from "../gql/gql";

type GenericImage<T> = (T | null)[];
type MinimumImage = Pick<Image, "url">;
type TypedImage = Pick<Image, "url" | "type">

/**
 * Returns an image from an array of images based on the type of the image.
 * @param images Array of images
 * @param type The type of the image to be returned as a string. If any image is acceptable, pass "any" to the function
 * @returns Image with url
 */
export function getImageByType<T extends MinimumImage>(images: GenericImage<T>, type: "any"): T | Pick<Image, "url">;
export function getImageByType<T extends TypedImage>(images: GenericImage<T>, type: string | string[]): T | Pick<Image, "url">;
export function getImageByType<T extends TypedImage>(
    images: GenericImage<T>,
    type: string | string[]
): T | Pick<Image, "url"> {
    const finalImage = images.reduce<T | null>((prev, cur) => {

        if (!cur) return prev

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
