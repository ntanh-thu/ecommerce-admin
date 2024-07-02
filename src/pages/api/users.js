import { mongooseConnect } from "../../../lib/mongooes";
import { Users } from "../../../models/Users";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Users.find());
  }
}
