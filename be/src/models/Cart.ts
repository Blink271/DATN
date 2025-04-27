import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  created_at: Date;
}

const CartSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<ICart>('Cart', CartSchema);