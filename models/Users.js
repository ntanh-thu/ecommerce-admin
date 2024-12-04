const { Schema, model, models, default: mongoose } = require("mongoose");
const { roles } = require("../constants/roles");

const UsersSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String },
  email: { type: String },
  image: { type: String },
  emailVerified: { type: Boolean },
  role: { type: String, default: roles[1], enum: roles },
});

export const Users = models.Users || model("Users", UsersSchema);
