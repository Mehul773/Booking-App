const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, require: true },
  user:{type: mongoose.Schema.Types.ObjectId, require: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guest:{type:Number, require:true},
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: { type: Number },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;