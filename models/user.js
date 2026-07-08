import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,       // one account per email
      lowercase: true,    // "User@Gmail.com" → "user@gmail.com"
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,       // basic validation
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;