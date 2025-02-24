import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Video', videoSchema);
