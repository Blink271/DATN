import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  description: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  start_date: Date;
  end_date: Date;
  active: boolean;
}

const DiscountSchema: Schema = new Schema({
  code: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true },
  discount_type: { type: String, enum: ['percent', 'fixed'], required: true },
  discount_value: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  active: { type: Boolean, required: true },
});

export default mongoose.model<IDiscount>('Discount', DiscountSchema);