import mongoose from "mongoose";
import mongooespaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    date: { type: String, require: true },
    description: { type: String, require: true },
  },
  {
    versionKey: false, //bỏ cái _v khi thêm product mới
    timestamps: true,
  }
);

productSchema.plugin(mongooespaginate);
const Product = mongoose.model("Product", productSchema);
export default Product;
