const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", ProductSchema);

module.exports = Products;
