// export const baseUrl = "https://lumina-talent-advisory-backend.onrender.com/api"
// export const imageBaseUrl = "https://lumina-talent-advisory-backend.onrender.com/uploads"

// export const cloudinaryBaseUrl = "https://res.cloudinary.com/df0tssvk4/image/upload"
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

export const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL

console.log("LOG BASE URL", process.env.NEXT_PUBLIC_BASE_URL);

