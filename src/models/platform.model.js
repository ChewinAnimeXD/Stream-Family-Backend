import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sell: {
    type: String, // Si debería ser Boolean, actualiza aquí
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: false,
  },
  pin: {
    type: String,
    required: false,
  }
}, {
  timestamps: true
});

export default mongoose.model("Platform", PlatformSchema);
