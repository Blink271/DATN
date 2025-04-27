import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 255 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);