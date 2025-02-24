import Image from '../models/imageModel.js';
import cloudinary from '../utils/cloudinary.js';
import Video from '../models/videoModel.js';
import Newsletter from '../models/newsletterModel.js';
import fs from 'fs';
import path from "path"

import mongoose from 'mongoose';


export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    console.log('Uploading image file:', req.file);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'cms_images',
    });

    // Save to MongoDB
    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      uploadedAt: new Date(),
    });

    await newImage.save();

    // Delete file from disk after upload
    fs.unlinkSync(req.file.path);

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Image Upload Failed:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};


export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

export const deleteImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find image by ID
      const image = await Image.findById(id);
      if (!image) return res.status(404).json({ error: 'Image not found' });
  
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);
  
      // Delete from MongoDB
      await Image.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  };

  
  

  
  export const uploadVideo = async (req, res) => {
    try {
      if (!req.file) {
        console.error('No video file received.');
        return res.status(400).json({ error: 'No video uploaded' });
      }
  
      console.log('Uploading video file:', req.file);
  
      // Ensure the file path exists
      if (!req.file.path) {
        console.error('File path is missing.');
        return res.status(500).json({ error: 'File path is missing. Check multer storage.' });
      }
  
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'cms_videos',
      });
  
      console.log('Cloudinary Upload Successful:', result);
  
      // Save to MongoDB
      const newVideo = new Video({
        url: result.secure_url,
        public_id: result.public_id,
        uploadedAt: new Date(),
      });
  
      await newVideo.save();
  
      // Delete file from disk after upload
      fs.unlinkSync(req.file.path);
  
      return res.status(201).json(newVideo);
    } catch (error) {
      console.error('Upload Failed:', error);
      return res.status(500).json({ error: 'Failed to upload video', details: error.message });
    }
  };
  
  
  // Fetch Videos
  export const getVideos = async (req, res) => {
    try {
      const videos = await Video.find().sort({ uploadedAt: -1 });
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve videos' });
    }
  };
  
  // Delete Video
  export const deleteVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) return res.status(404).json({ error: 'Video not found' });
  
      await cloudinary.uploader.destroy(video.public_id, { resource_type: 'video' });
      await Video.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete video' });
    }
  };
  



  
  // ✅ Upload Newsletter (POST)

export const uploadNewsletter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "newsletters",
      resource_type: "auto",
    });

    const newNewsletter = new Newsletter({
      fileName: req.file.originalname,
      filePath: cloudinaryResponse.secure_url, // Store Cloudinary URL
      cloudinaryId: cloudinaryResponse.public_id, // Store Cloudinary ID for deletion
      uploadedAt: new Date(),
    });

    await newNewsletter.save();
    res.status(201).json(newNewsletter);
  } catch (error) {
    console.error("Error uploading newsletter:", error);
    res.status(500).json({ error: "Failed to upload newsletter" });
  }
};

  
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ uploadedAt: -1 });

    res.json(newsletters); // Now includes Cloudinary URLs
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
};

  
  // ✅ Delete Newsletter by ID (DELETE)
  export const deleteNewsletter = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid newsletter ID" });
      }
  
      const newsletter = await Newsletter.findById(id);
      if (!newsletter) {
        return res.status(404).json({ error: "Newsletter not found!" });
      }
  
      // Delete from Cloudinary
      if (newsletter.cloudinaryId) {
        await cloudinary.uploader.destroy(newsletter.cloudinaryId);
      }
  
      // Delete from database
      await Newsletter.findByIdAndDelete(id);
      res.json({ message: "Newsletter deleted successfully!" });
    } catch (error) {
      console.error("Delete failed:", error);
      res.status(500).json({ error: "Failed to delete newsletter" });
    }
  };
  