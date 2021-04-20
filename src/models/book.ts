// Import dependencies
import { Document, model, Model, Schema } from "mongoose";

// Define interface
export interface IBook extends Document {
  title: string,
  description: string,
  publishDate: Date,
  pageCount: number,
  coverImage: Buffer,
  coverImageType: string,
  createdAt: Date,
  author: Schema.Types.ObjectId
}

// Define schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

// Define and export book model
const Book: Model<IBook> = model("Book", bookSchema);

export default Book;