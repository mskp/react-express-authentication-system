import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshTokens: {
    type: [String],
    // Custom validation to ensure uniqueness of refresh tokens in the array
    validate: {
      validator: function (array) {
        return new Set(array).size === array.length;
      },
      message: "Refresh token already exists."
    },
    required: true
  }
}, {
  // Including timestamps to track creation and modification times
  timestamps: true
});

const User = model('User', userSchema);

export default User;
