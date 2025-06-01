import { Document,model, Schema } from 'mongoose';

export interface IPadDetails extends Document {
  product_id: string;
  width: number;
  height: number;
  thick: number;
  type: string;
}

const padDetailsSchema = new Schema<IPadDetails>({
  product_id: { type: String, required: true, unique: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  thick: { type: Number, required: true },
  type: { type: String, required: true },
});

export const PadDetails = model<IPadDetails>('HadnheldDetails', padDetailsSchema);
