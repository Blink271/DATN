import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user_id: mongoose.Types.ObjectId;
  phone: string;
  address: string;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: Date;
}

const OrderSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true, maxlength: 20 },
  address: { type: String, required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, required: true, default: 'pending' },
  payment_method: { type: String, required: true, maxlength: 50 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);