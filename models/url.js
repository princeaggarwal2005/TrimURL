import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, //auto create createdAt and updatedAt fields
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
