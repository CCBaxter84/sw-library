"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var mongoose_1 = require("mongoose");
// Define schema
var bookSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }
});
// Define and export book model
var Book = mongoose_1.model("Book", bookSchema);
exports.default = Book;
