import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter promotion name."],
  },
  percentRate: {
    type: Number,
    required: [true, "Please enter promotion percent rate."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Promotion ||
  mongoose.model("Promotion", promotionSchema);
