import { Document,model, Schema } from 'mongoose';

export interface IHeadphoneDetails extends Document {
  product_id: string;
  driver_size: string;
  frequency_response: string;
  wireless: boolean;
  microphone: boolean;
  surround_sound: boolean;
}

const headphoneDetailsSchema = new Schema<IHeadphoneDetails>({
  product_id: { type: String, required: true, unique: true },
  driver_size: { type: String, required: true },
  frequency_response: { type: String, required: true },
  wireless: { type: Boolean, required: true },
  microphone: { type: Boolean, required: true },
  surround_sound: { type: Boolean, required: true },
});

export const HeadphoneDetails = model<IHeadphoneDetails>('HeadphoneDetails', headphoneDetailsSchema);
