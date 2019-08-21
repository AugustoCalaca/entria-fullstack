import mongoose, { Model, Document, Types } from 'mongoose';

const schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

// schema.index({ title: 'text' });

export interface IBook extends Document {
  author: Types.ObjectId;
  title: string
}

const BookModel: Model<IBook> = mongoose.model('Book', schema);

export default BookModel
