const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },           // Unique identifier
    name: { type: String, required: true },                       // Sweet name
    category: { type: String, required: true },                   // chocolate, candy, pastry, etc.
    price: { type: Number, required: true },                      // Price in currency
    quantity: { type: Number, required: true },                   // Quantity in stock
    createdAt: { type: Date, default: Date.now },                 // Auto timestamp
});

module.exports = mongoose.model("sweets", sweetSchema);