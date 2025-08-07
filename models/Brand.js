const { Schema, model, models } = require("mongoose");

const BrandSchema = new Schema({
  name: { type: String, required: true }, // Ví dụ: 'Samsung', 'Apple'
});

export const Brand = models?.Brand || model("Brand", BrandSchema);
