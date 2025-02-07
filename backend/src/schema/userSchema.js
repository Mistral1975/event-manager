import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //salt: {type: String, required: true},
    //status: {type: String, default: "active"},
    //registrationToken: {type: String, required: true},
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      writeConcern: { w: 1, wtimeout: 1000 },
    },
  }
);

export default model("User", userSchema);
