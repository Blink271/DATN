import { Document,model, Schema } from 'mongoose';

export interface IKeyboardDetails extends Document {
  product_id: string;
  switch_type: string;
  layout: string;
  key_rollover: string;
  wireless: boolean;
  rgb: boolean;
}

const keyboardDetailsSchema = new Schema<IKeyboardDetails>({
  product_id: { type: String, required: true, unique: true },
  switch_type: { type: String, required: true },
  layout: { type: String, required: true },
  key_rollover: { type: String, required: true },
  wireless: { type: Boolean, required: true },
  rgb: { type: Boolean, required: true },
});

export const KeyboardDetails = model<IKeyboardDetails>('KeyboardDetails', keyboardDetailsSchema);