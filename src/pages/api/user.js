import { mongooseConnect } from "@/lib/mongooes";
import { Users } from "@/models/Users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === "POST") {
    const { username, password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username: username,
      password: hashedPassword,
      name: name,
      email: email,
      image: "",
      emailVerified: false,
      role: "user",
    });
    if (user) {
      return res.status(201).json({ username: user.username });
    } else {
      return res.status(400).json("Sign up fail");
    }
  }
}
