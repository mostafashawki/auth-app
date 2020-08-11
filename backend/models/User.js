const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    max: 35,
    required: true,
  },
  lastName: {
    type: String,
    max: 35,
    required: true,
  },
  email: {
    type: String,
    max: 255,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    max: 50,
    required: true,
  },
  phoneDetails: {
    country: {
      type: String,
      max: 2,
      required: false,
    },
    countryCallingCode: {
      type: String,
      max: 2,
      required: false,
    },
    nationalNumber: {
      type: String,
      max: 13,
      required: false,
    },
    number: {
      type: String,
      max: 15,
      required: false,
    },
    verified: {
      type: Boolean,
      required: false,
    },
    verificationRequestId: {
      type: String,
      max: 50,
      required: false,
    },
    verificationCode: {
      type: String,
      max: 6,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  emailVerified: {
    type: Boolean,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
