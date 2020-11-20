import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, require: true },
    fullName: { type: String, default: '' },
    phone: { type: String, length: 11 },
    password: { type: String },
    metaData: {
      type: mongoose.Mixed,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },

    paymentDetails: {
      type: Object,
      default: {},
    },

    paymaentHistory: [
      {
        type: Object,
        default: {},
      },
    ],
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

//VIRTUAL POPULATE
userSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'author',
  localField: '_id',
});

// userSchema.virtual('posts', {
//   ref: 'Post', //
//   foreignField: 'author', //The value used in the Post model
//   localField: '_id', //required, it represent the current model which is the user
// });

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model('User', userSchema);

export { User };
