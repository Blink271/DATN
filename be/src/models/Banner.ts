import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  image_url: string;
  link_url: string;
  position: 'homepage' | 'category' | 'product';
  is_active: boolean;
  created_at: Date;
}

const BannerSchema: Schema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  image_url: { type: String, required: true, maxlength: 255 },
  link_url: { type: String, required: true, maxlength: 255 },
  position: { type: String, enum: ['homepage', 'category', 'product'], required: true },
  is_active: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IBanner>('Banner', BannerSchema);