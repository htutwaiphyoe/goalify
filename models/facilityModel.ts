import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter facility name."],
    maxLength: [100, "Facility name cannot be exceeded 100 characters."],
  },
  description: {
    type: String,
    trim: true,
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

export default mongoose.models.Facility ||
  mongoose.model("Facility", facilitySchema);
