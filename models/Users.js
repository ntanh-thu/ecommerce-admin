const { Schema, model, models, default: mongoose } = require("mongoose");

const UsersSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  image: { type: String },
  emailVerified: { type: Boolean },
});

export const Users = models.Users || model("Users", UsersSchema);
