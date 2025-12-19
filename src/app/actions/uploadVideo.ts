'use server'

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadVideoToCloudinary(formData: FormData) {
  try {
    const file = formData.get('video') as File;
    
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'lumina_videos',
          public_id: `lumina_intro_video_${Date.now()}`,
          // Video optimization settings
          quality: 'auto:best',
          format: 'mp4',
          // Enable adaptive streaming
          eager: [
            { quality: 'auto:best', format: 'mp4' },
            { quality: 'auto:good', format: 'mp4' },
          ],
          eager_async: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return { 
      success: true, 
      data: result,
      videoUrl: (result as any).secure_url,
      publicId: (result as any).public_id
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
}

export async function uploadVideoFromUrl(videoUrl: string) {
  try {
    // Upload from Google Drive URL to Cloudinary
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      folder: 'lumina_videos',
      public_id: `lumina_intro_video_${Date.now()}`,
      quality: 'auto:best',
      format: 'mp4',
      // Video transformation settings
      eager: [
        { 
          quality: 'auto:best', 
          format: 'mp4',
          video_codec: 'h264',
          audio_codec: 'aac'
        },
      ],
      eager_async: true,
    });

    return {
      success: true,
      data: result,
      videoUrl: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Error uploading video from URL:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

export async function getVideoDetails(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'video'
    });
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error getting video details:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get video details'
    };
  }
}