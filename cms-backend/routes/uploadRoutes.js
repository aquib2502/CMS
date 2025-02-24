import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { 
  uploadImage, getImages, deleteImage, 
  uploadVideo, getVideos, deleteVideo, 
  uploadNewsletter,getNewsletters,deleteNewsletter
} from '../controllers/uploadController.js';

const router = express.Router();

// Create upload directories if they don't exist
const createUploadDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};


const imageUploadDir = path.join(process.cwd(), 'uploads', 'images');
const videoUploadDir = path.join(process.cwd(), 'uploads', 'videos');
const newsletterUploadDir = path.join(process.cwd(), 'uploads', 'newsletter');


createUploadDir(imageUploadDir);
createUploadDir(videoUploadDir);
createUploadDir(newsletterUploadDir)


// Multer storage for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer storage for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const newsletterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, newsletterUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// Upload middleware
const uploadImageMiddleware = multer({ storage: imageStorage });
const uploadVideoMiddleware = multer({ storage: videoStorage });
const uploadNewsletterMiddleware = multer({storage: newsletterStorage})

// Image Routes
router.post('/upload/imageUpload', uploadImageMiddleware.single('file'), uploadImage);
router.get('/upload/images', getImages);
router.delete('/upload/image/:id', deleteImage);

// Video Routes
router.post('/upload/videoUpload', uploadVideoMiddleware.single('file'), uploadVideo);
router.get('/upload/videos', getVideos);
router.delete('/upload/video/:id', deleteVideo);

// Newsletter Routes
router.post("/upload/newsletterUpload", uploadNewsletterMiddleware.single("file"), uploadNewsletter);
router.get("/upload/newsletters", getNewsletters);
router.delete("/upload/newsletter/:id", deleteNewsletter);

export default router;
