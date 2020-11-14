const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const SubscriptionSchema = new Schema({
  name: String,
  activeValues: [Object],
  auth: Object,
  owner: {
    _id: { type: Number, ref: "User" },
    email: String,
    firstName: String,
    lastName: String,
  },
  subscriptionType: {
    type: String,
    enums: [
      "Free",
      "Basic Month",
      "Premium Month",
      "Basic Annual",
      "Premium Annual",
    ],
  },
  subscriptionScope: {
    type: String,
    enums: ["Trial", "Monthly", "Annually"],
  },
  validTill: Date,
  referenceID: String,
  paidOn: Date,
  domain: String,
  amount: Number,
  nextPaymentDate: Date,
  IPAddress: String,
  currency: String,
  all: {},
});

SubscriptionSchema.plugin(autoIncrement.plugin, {
  model: "Subscription",
  startAt: 1,
  incrementBy: 1,
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
