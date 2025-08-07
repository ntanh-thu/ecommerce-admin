const { Schema, model, models } = require("mongoose");

const PropertyDefinitionSchema = new Schema({
  name: { type: String, required: true }, // Tên hiển thị: 'Màu sắc'
  key: { type: String, required: true }, // Key chuẩn: 'color'
  values: [String], // Danh sách gợi ý: ['Đỏ', 'Đen', 'Trắng']
});

export const PropertyDefinition =
  models?.PropertyDefinition ||
  model("PropertyDefinition", PropertyDefinitionSchema);
