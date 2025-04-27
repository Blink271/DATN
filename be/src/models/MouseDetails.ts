import { Document,model, Schema } from 'mongoose';

export interface IMouseDetails extends Document {
  product_id: string;
  dpi: number;
  sensor_type: string;
  wireless: boolean;
  rgb: boolean;
  buttons: number;
}

const mouseDetailsSchema = new Schema<IMouseDetails>({
  product_id: { type: String, required: true, unique: true },
  dpi: { type: Number, required: true },
  sensor_type: { type: String, required: true },
  wireless: { type: Boolean, required: true },
  rgb: { type: Boolean, required: true },
  buttons: { type: Number, required: true },
});

export const MouseDetails = model<IMouseDetails>('MouseDetails', mouseDetailsSchema);