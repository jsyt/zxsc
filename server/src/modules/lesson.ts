import mongoose, { Schema, Document, Model } from 'mongoose';




export interface LessonDocument extends Document {
  order: number
  title: string;
  video: string;
  poster: string;
  url: string;
  price: string;
  category: string;
}

const LessonSchema: Schema<LessonDocument> = new Schema({
  order: Number,
  title: String,
  video: String,
  poster: String,
  url: String,
  price: String,
  category: String,
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

export const Lesson: Model<LessonDocument> = mongoose.model('Lesson', LessonSchema);