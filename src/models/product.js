import mongoose from "mongoose";
import mongooespaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    desc: { type: String },
  },
  {
    versionKey: false, //bỏ cái _v khi thêm product mới
    timestamps: true,
  }
);

productSchema.plugin(mongooespaginate);
const Product = mongoose.model("Product", productSchema);
export default Product;
