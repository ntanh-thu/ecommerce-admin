import { mongooseConnect } from "@/lib/mongooes";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_KEY_SECRET);
import { buffer } from "micro";
const endpointSecret = "whsec_aab576e66429ba41f93e39723d2ed112edc0c1d9c982cb2b7005815d423c49fb";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

//unreal-plush-fast-feat
