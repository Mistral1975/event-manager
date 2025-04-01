// src/schema/userSchema.js
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: { type: [String], default: [] }, // Salviamo i Refresh Token attivi
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
