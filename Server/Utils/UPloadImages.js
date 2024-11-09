import multer, { memoryStorage } from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const multerStorage = multer.memoryStorage();
  
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported File Format."), false);
    }
  };

  export const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
      fileSize: 5000000, // 10MB
    },
  });

  export const handleFileSizeError = (err, req, res, next) => { 
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image file size should not be more than 10MB." });
    }
    next(err);
  };

  export const uploadAvatar = async (file, existingPublicId) => {
    try {
      if (existingPublicId) {
        const deleteResponse = await cloudinary.uploader.destroy(existingPublicId);
        if (deleteResponse.result !== 'ok') {
          throw new Error(`Failed to delete image with public_id ${existingPublicId}`);
        }
      }
  
      // Upload the new image
      const uploadResponse = await new Promise((resolve, reject) => {
        const buffer = sharp(file.buffer)
        .resize({ width: 300, height: 300, fit: sharp.fit.inside, withoutEnlargement: true })
          .toFormat("jpg")
          .jpeg({ quality: 90 })
          .toBuffer();
  
        buffer.then((processedBuffer) => {
          cloudinary.uploader.upload_stream(
            { folder: "BankApp/UserPics", format: "jpg" },
            (error, result) => {
              if (error) {
                console.error('Upload Error:', error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          ).end(processedBuffer);
        }).catch((error) => {
          console.error('Buffer Error:', error);
          reject(error);
        });
      });
  
      return {
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    } catch (error) {
      console.error('UploadAvatar Error:', error);
      throw error;
    }
  };

  const documentStorage = multer.memoryStorage();

  export const documentFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format. Only PDFs are allowed."), false);
    }
  };

  export const uploadDocuments = multer({
    storage: documentStorage,
    fileFilter: documentFilter,
    limits: {
      fileSize: 5000000, // 5MB limit for each document
    },
  });
  
  export const uploadAccountDocs = async (file, existingPublicId) => {
    try {
      if (existingPublicId) {
        const deleteResponse = await cloudinary.uploader.destroy(existingPublicId);
        if (deleteResponse.result !== 'ok') {
          throw new Error(`Failed to delete image with public_id ${existingPublicId}`);
        }
      }
  
      // Upload the new image
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "BankApp/Documents",
            resource_type: "raw",  // Required for non-image files like PDFs
            format: "pdf",          // Ensures it retains PDF format
          },
          (error, result) => {
            if (error) {
              console.error("Upload Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(file.buffer);  // Send PDF file buffer
      });
  
      return {
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    } catch (error) {
      console.error('UploadDocs Error:', error);
      throw error;
    }
  };