import { Document,model, Schema } from 'mongoose';

export interface IHandheldDetails extends Document {
  product_id: string;
  pin: number;
  wireless: boolean;
  rgb: boolean;
  buttons: number;
}

const handheldDetailsSchema = new Schema<IHandheldDetails>({
  product_id: { type: String, required: true, unique: true },
  pin: { type: Number, required: true },
  wireless: { type: Boolean, required: true },
  rgb: { type: Boolean, required: true },
  buttons: { type: Number, required: true },
});

export const HandheldDetails = model<IHandheldDetails>('HandheldDetails', handheldDetailsSchema);
