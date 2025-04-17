const mongoose = require("mongoose");

const BillboardSchema = new mongoose.Schema({
  location: { type: String, required: true },
  address: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: "week", enum: ["day", "week", "month"] },
  size: {
    height: { type: Number, required: true }, 
    width: { type: Number, required: true },   
    unit: { type: String, default: "feet" }
  },
  views: { type: String },
  dailyImpressions: { type: Number },
  available: { type: Boolean, default: true },
  type: { type: String, default: "Static", enum: ["Static", "Digital", "LED", "Transit", "Other"] },
  facingDirection: { type: String },
  minBookingDays: { type: Number, default: 7 },
  description: { type: String },
  images: { type: [String], default: [] },
  features: { type: [String], default: [] },
  nearbyAttractions: { type: [String], default: [] },
  owner: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    response: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Virtual for formatted size string
BillboardSchema.virtual('sizeFormatted').get(function() {
  return `${this.size.height} × ${this.size.width} ${this.size.unit}`;
});

// Set to return virtuals when converted to JSON
BillboardSchema.set('toJSON', { virtuals: true });
BillboardSchema.set('toObject', { virtuals: true });

const Billboard = mongoose.model("Billboard", BillboardSchema);
module.exports = Billboard;
