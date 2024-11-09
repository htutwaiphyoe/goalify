import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadAvatar = async (avatar: any) => {
  return await cloudinary.uploader.upload(avatar, {
    folder: "hotel-valhalla/avatars",
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  });
};

export const deleteAvatar = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

export const uploadRoomImage = async (image: any) => {
  return await cloudinary.uploader.upload(image, {
    folder: "hotel-valhalla/rooms",
  });
};
