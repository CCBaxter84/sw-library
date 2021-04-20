// Import dependencies
import { Document, model, Model, Schema } from "mongoose";
import Book from "./book";

// Define interfaces
export interface IAuthor extends Document {
  name: string
}

// Define schema
const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Set guard clause to prevent deleting an author with books in the DB
/*authorSchema.pre("remove", async function(this: IAuthor, next) {
  try {
    const books = await Book.find({ author: this.id });
    if (books.length > 0) {
      next(new Error("This author still has books"));
    };
  } catch(err) {
    next(err);
  }
});*/

// Define and export model based on schema
const Author: Model<IAuthor> = model("Author", authorSchema);

export default Author;