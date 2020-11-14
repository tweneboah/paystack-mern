const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, minlength: 8, required: true },
  metaData: {
    type: mongoose.Mixed,
  },
  isUserOnFuture: { type: Boolean, default: false },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationToken: {
    type: String,
  },
  paidForVacation: {
    type: Boolean,
    default: false,
  },
  paymentDetails: {
    type: Object,
    default: {},
  },
  mustActivate: {
    type: Date,
    default: Date.now() + 86400000, //24hours
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  bankAccounts: [
    {
      nuban: { type: String, default: "" },
      default: { type: Boolean, default: false },
      name: { type: String, default: "" },
      bankCode: { type: String, default: "" },
      bankName: { type: String, default: "" },
    },
  ],
  resetToken: { type: String },
  resetExpiresIn: { type: Date },
  phone: { type: String, length: 11 },
  dob: { type: String },
  gender: { type: String },
  lastSeen: {
    type: Date,
  },
  isAdmin: { type: Boolean, default: false },
  creditCards: [
    {
      cardType: String,
      cardNumber: String,
      expiryDate: Date,
      pin: {
        type: String,
        length: 4,
      },
      cvv: {
        type: String,
        length: 3,
      },
    },
  ],
  signature: {
    id: { type: String, default: "" },
    url: String,
    createdAt: { type: Date },
  },
  paystackSubAccount: {
    id: { type: Number, default: "" },
    businessName: { type: String, default: "" },
    settlementBank: { type: String, default: "" },
    subAccountCode: { type: String, default: "" },
    description: { type: String, default: "" },
    currency: {
      type: String,
      default: "NGN",
    },
    accountNumber: {
      type: String,
      default: "",
    },
    percentageCharge: {
      type: Number,
      default: 100,
    },
    primaryContactName: {
      type: String,
      default: "",
    },
    primaryContactEmail: {
      type: String,
      default: "",
    },
    primaryContactPhone: {
      type: String,
      default: "",
    },
  },
  companyLogo: {
    id: { String, default: "" },
    url: { String, default: "" },
    createdAt: { type: Date },
  },
  profilePicture: {
    id: String,
    url: String,
    createdAt: { type: Date },
  },
  subscriptions: [{ type: Number, ref: "Subscription" }],
  joined: {
    type: Date,
    default: Date.now,
  },
  documents: [
    {
      type: Number,
      ref: "Document",
    },
  ],
  payments: [
    {
      type: Number,
      ref: "Payment",
    },
  ],
  usedCoupons: [
    {
      type: Number,
      ref: "Coupon",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
