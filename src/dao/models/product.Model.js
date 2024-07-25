import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: Array,
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
