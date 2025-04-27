import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
  cart_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
}

const CartItemSchema: Schema = new Schema({
  cart_id: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);
