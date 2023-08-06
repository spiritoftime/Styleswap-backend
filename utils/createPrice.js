"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = require("stripe");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var stripe = new stripe_1.default(process.env.STRIPE_TEST_KEY, {
    apiVersion: "2022-11-15",
});
stripe.products
    .create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
})
    .then(function (product) {
    stripe.prices
        .create({
        unit_amount: 1200,
        currency: "usd",
        recurring: {
            interval: "month",
        },
        product: product.id,
    })
        .then(function (price) {
        console.log("Success! Here is your starter subscription product id: " + product.id);
        console.log("Success! Here is your premium subscription price id: " + price.id);
    });
});
