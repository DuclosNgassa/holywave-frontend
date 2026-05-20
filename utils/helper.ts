import { ImageSize } from "@/app/models/types";

export const getOptimizedImage = (url: string, imageSize: ImageSize) => {
    if (!url.includes("/upload/")) return url;
    return url.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill,q_auto,f_auto/"
      );

/*     switch (imageSize) {
        case ImageSize.Small:
            return url.replace("/upload/", "/upload/w_400,c_limit,q_auto/");;
        case ImageSize.Medium:
            return url.replace("/upload/", "/upload/w_800,c_limit,q_auto/");;
        case ImageSize.Big:
            return url.replace("/upload/", "/upload/w_1000,c_limit,q_auto/");;
        default:
            throw new Error(`Unhandled imageSize: ${imageSize}`);
    }
 */
}