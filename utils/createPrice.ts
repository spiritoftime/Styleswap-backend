import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_TEST_KEY, {
  apiVersion: "2022-11-15",
});

stripe.products
  .create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
  })
  .then((product) => {
    stripe.prices
      .create({
        unit_amount: 1200,
        currency: "usd",
        recurring: {
          interval: "month",
        },
        product: product.id,
      })
      .then((price) => {
        console.log(
          "Success! Here is your starter subscription product id: " + product.id
        );
        console.log(
          "Success! Here is your premium subscription price id: " + price.id
        );
      });
  });
