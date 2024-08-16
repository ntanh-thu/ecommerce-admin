import { Product } from "../../../models/Products";
import { mongooseConnect } from "../../../lib/mongooes";
import { authOption, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  if (method === "POST") {
    const { title, description, price, images, category, properties } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
      setFeature: false,
    });
    res.json(productDoc);
  }
  if (method === "PUT") {
    if (req.body?._id) {
      const { _id, title, description, price, images, category, properties } = req.body;
      const productDoc = await Product.updateOne({ _id }, { title, description, price, images, category, properties });
      res.json(productDoc);
    } else {
      const { newID, oldID } = req.body;
      if (oldID) {
        await Product.updateOne({ _id: oldID }, { setFeature: false });
        const newFeature = await Product.updateOne({ _id: newID }, { setFeature: true });
        res.json(newFeature);
      } else {
        const newFeature = await Product.updateOne({ _id: newID }, { setFeature: true });
        res.json(newFeature);
      }
    }
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      res.json(await Product.deleteOne({ _id: req.query.id }));
    }
  }
}
