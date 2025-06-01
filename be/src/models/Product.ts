//Product.ts

import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: 'mouse' | 'keyboard' | 'headphone' | 'handheld' | 'pad';
  sold_count: number;
  discount_id?: string;
  created_at: Date;
}


const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image_url: { type: String, required: true },
  category: { type: String, enum: ['mouse', 'keyboard', 'headphone', 'handheld', 'pad'], required: true },
  sold_count: { type: Number, default: 0 },
  discount_id: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const Product = model<IProduct>('Product', productSchema);
