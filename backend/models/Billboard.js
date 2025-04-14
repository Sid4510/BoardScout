const mongoose = require("mongoose");

const BillboardSchema = new mongoose.Schema({
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  price: { type: Number, required: true },
  size: {
    height: { type: Number, required: true }, 
    width: { type: Number, required: true },   
  },
  available: { type: Boolean, default: true },
  description: { type: String },
  images: { type: [String], default: [] },
});

const Billboard = mongoose.model("Billboard", BillboardSchema);
module.exports = Billboard;
