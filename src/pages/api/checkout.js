import { mongooseConnect } from "@/lib/mongooes";
import { Order } from "@/models/Order";
import { Product } from "@/models/Products";
const stripe = require("stripe")(process.env.STRIPE_KEY_SECRET);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
  }
  await mongooseConnect();
  const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];

  for (const productId of uniqueIds) {
    const productinfo = productInfos.find((p) => p._id.toString() === productId);
    const quantity = productIds.filter((id) => id === productId).length || 0;
    if (quantity > 0 && productinfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productinfo.title },
          unit_amount: parseInt(productinfo.price) * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
      test: "ok",
    },
  });
  res.json({
    url: session.url,
  });
}
