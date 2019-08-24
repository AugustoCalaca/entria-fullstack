import mongoose, { Model, Document, Types } from 'mongoose';
import { IBook } from '../book/BookModel';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }]
}, {
  timestamps: true
});

export interface IAuthor extends Document {
  name: string,
  age: number
  books: Array<Types.ObjectId | IBook>
}

const AuthorModel: Model<IAuthor> = mongoose.model('Author', schema);

export default AuthorModel;
