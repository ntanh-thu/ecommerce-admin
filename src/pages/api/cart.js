import { mongooseConnect } from "@/lib/mongooes";
import { Product } from "@/models/Products";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
}
