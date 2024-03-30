import {S3Client} from '@aws-sdk/client-s3'
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
import { MulterS3File } from "../interface/interface";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    file?: MulterS3File;
    s3ObjectUrl?: string; 

  }
}

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_REGION as string;
const bucketAccessKey = process.env.AWS_ACCESS_KEY as string;
const bucketSecretAccessKey = process.env.AWS_SECRET_KEY as string;

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region:region,
});

const s3Storage = multerS3({
  s3: s3,
  bucket: bucketName,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});


function sanitizeFile(file: any, cb: any) {
  const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".pdf"]; 

  const isAllowedExt = allowedExt.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isImage = file.mimetype.startsWith("image/");
  const isPDF = file.mimetype === "application/pdf"; 

  if ((isAllowedExt && isImage) || (isAllowedExt && isPDF)) { 
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

export const uploadMedia = multer({
  
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

const uploadProfilePicture = uploadMedia.single("profilePicture");
const uploadResume = uploadMedia.single("resume"); 

export { uploadProfilePicture, uploadResume }; 
