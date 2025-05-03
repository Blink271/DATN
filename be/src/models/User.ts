import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  role: 'admin' | 'user',
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, { timestamps: true
  // Tự động thêm trường createdAt và updatedAt
});

export default mongoose.model<IUser>('User', UserSchema);