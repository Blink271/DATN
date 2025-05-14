//User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: 'admin' | 'user';
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/,
    maxlength: 10
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'Users'
});

export default mongoose.model<IUser>('User', UserSchema);