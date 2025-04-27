import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRole extends Document {
  user_id: mongoose.Types.ObjectId;
  role_id: mongoose.Types.ObjectId;
}

const UserRoleSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
});

export default mongoose.model<IUserRole>('UserRole', UserRoleSchema);