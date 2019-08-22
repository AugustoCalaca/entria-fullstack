import mongoose, { Model, Document } from 'mongoose';

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
}, {
  timestamps: true
});

export interface IAuthor extends Document {
  name: string,
  age: number
}

const AuthorModel: Model<IAuthor> = mongoose.model('Author', schema);

export default AuthorModel;
