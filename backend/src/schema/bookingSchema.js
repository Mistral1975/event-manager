// src/schema/bookingSchema.js
import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Riferimento all'evento prenotato
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Riferimento all'utente che effettua la prenotazione
      required: true,
    },
    seatsBooked: {
      type: Number,
      required: true,
      min: 1, // Almeno un posto deve essere prenotato
    },
    status: {
      type: String,
      enum: ["active", "cancelled"], // Stato della prenotazione
      default: "active",
    },
  },
  { timestamps: true } // Aggiunge createdAt e updatedAt
);

export default model("Booking", bookingSchema);

/**
 * Usiamo mongoose.Schema.Types.ObjectId invece di String per eventId e userId perché:
 * 1️⃣ Relazioni tra Documenti (Reference)
 * ---> MongoDB permette di creare relazioni tra documenti usando ObjectId.
 * ---> Con ref: "Event" e ref: "User", possiamo usare Mongoose Populate per recuperare i dati dell'evento e dell'utente con una sola query!
 * 2️⃣ Efficienza della Query
 * ---> Gli ObjectId sono indicizzati e ottimizzati per le ricerche.
 * ---> Cercare un documento tramite ObjectId è più veloce rispetto a cercarlo con una String.
 * 3️⃣ Garanzia di Integrità
 * ---> MongoDB genera automaticamente ObjectId quando un documento viene creato.
 * ---> Usare String potrebbe portare a errori, come ID non validi o duplicati.
 */
