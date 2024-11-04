"use strict";
import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 200000000 },
});

const uploadImage = (req, res, next) => {
  upload.single("profileImg")(req, res, async (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
              if (error) return reject(error);
              resolve(result);
            })
            .end(req.file.buffer);
        });

        req.cloudinaryImageUrl = result.secure_url;

        next();
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });
};

export default uploadImage;
