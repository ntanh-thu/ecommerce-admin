const { Schema, model, models, default: mongoose } = require("mongoose");

const UsersSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String },
  email: { type: String },
  image: { type: String },
  emailVerified: { type: Boolean },
});

export const Users = models.Users || model("Users", UsersSchema);
