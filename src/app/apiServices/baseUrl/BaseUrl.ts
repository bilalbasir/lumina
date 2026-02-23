
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
export const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL!

export const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL!

export const getImageUrl = (image: string | undefined | null) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${imageBaseUrl}/${image}`;
};

export const getCloudinaryUrl = (image: string | undefined | null) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${cloudinaryBaseUrl}/${image}`;
};


