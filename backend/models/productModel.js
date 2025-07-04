import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      deafult: 0,
    },
    description: {
      type: String,
      required: [true, "Please enter desciption"],
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
