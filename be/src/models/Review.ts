import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  created_at: Date;
}

const ReviewSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);