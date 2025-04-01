// src/schema/eventSchema.js
import mongoose, { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0, // Nessun valore negativo
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Prezzo minimo 0 (evento gratuito)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referenza all'utente che ha creato l'evento
      required: true,
    },
  },
  { timestamps: true } // Aggiunge createdAt e updatedAt
);

export default model("Event", eventSchema);
