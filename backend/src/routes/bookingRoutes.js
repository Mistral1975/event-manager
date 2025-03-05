import express from "express";
import bookingController from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Creazione di una nuova prenotazione (Protetto, solo utenti autenticati)
router.post("/", authMiddleware, bookingController.createBooking);

// 📌 Ottenere una prenotazione specifica dell'utente autenticato
router.get("/:id", authMiddleware, bookingController.findBookingById);

// 📌 Ottenere tutte le prenotazioni dell'utente autenticato
router.get("/", authMiddleware, bookingController.findBookingsByUser);

// 📌 Annullare una prenotazione dell'utente autenticato
router.delete("/:id", authMiddleware, bookingController.deleteBooking);

export default router;
