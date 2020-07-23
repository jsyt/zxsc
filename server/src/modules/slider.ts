import mongoose, { Schema, Document, Model } from 'mongoose';




export interface SliderDocument extends Document {
  url: string;
}

const SliderSchema: Schema<SliderDocument> = new Schema({
  url: String
}, {
  timestamps: true,
  toJSON: {
    transform: function (_doc: any, result: any) {
      result.id = result._id;
      delete result._id;
      delete result.__v;
      delete result.updatedAt;
      delete result.createdAt;
      return result;
    }
  }
  }
);

export const Slider: Model<SliderDocument> = mongoose.model('Slider', SliderSchema);