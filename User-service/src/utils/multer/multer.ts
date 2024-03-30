import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Ensure that the destination directory exists
    cb(null, './files');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Append a unique identifier to the filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// const fileFilter = (req: Request, file: Express.Multer.File, cb:any) => {
//   // Validate file type (e.g., allow only PDFs)
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed'), false);
//   }
// };

const upload = multer({
  storage: storage,
//   fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
  }
});

// const upload = multer({dest:"./files"})

export default upload;
