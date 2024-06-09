import { mongooseConnect } from "../../../lib/mongooes";
import { Category } from "../../../models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }
  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }
  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id: _id },
      { name, parent: parentCategory || undefined, properties }
    );
    res.json(categoryDoc);
  }
  if (method === "DELETE") {
    if (req.query?._id) {
      res.json(await Category.deleteOne({ _id: req.query._id }));
    }
  }
}
