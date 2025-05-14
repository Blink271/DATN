//Order.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  shippingFee: number;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  requireInvoice: boolean;
  discountCode?: string;
  status: 'pending' | 'completed' | 'canceled';
  created_at: Date;
}

const OrderSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: {
      type: String,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingFee: {
    type: Number,
    required: true,
    min: 0
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/,
    maxlength: 10
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  requireInvoice: {
    type: Boolean,
    default: false
  },
  discountCode: {
    type: String,
    trim: true,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'Orders'
});

export default mongoose.model<IOrder>('Order', OrderSchema);