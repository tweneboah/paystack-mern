import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User who is creating this product required'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Product = mongoose.model('Product', productSchema);

export { Product };
