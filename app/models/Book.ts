import mongoose, { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }], // Array of strings for tags
  status: { 
    type: String, 
    enum: ["Want to Read", "Reading", "Completed"], 
    default: "Want to Read" 
  },
}, { timestamps: true });

export const Book = models.Book || model("Book", BookSchema);
