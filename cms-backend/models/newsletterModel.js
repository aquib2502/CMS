import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true }, // Cloudinary URL
  cloudinaryId: { type: String, required: true }, 
  uploadedAt: { type: Date, default: Date.now }, // ✅ Ensure uploadedAt is always set
});

export default  mongoose.model('Newsletter', newsletterSchema)