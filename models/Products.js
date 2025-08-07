const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    description: String,
    price: { type: String, require: true },
    quantity: { type: Number, require: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
    properties: [
      {
        name: String, // 'Màu sắc'
        key: String, // 'color' (chuẩn hóa)
        value: String, // 'Đỏ'
      },
    ],
    setFeature: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
