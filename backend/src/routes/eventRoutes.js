// src/routes/eventRoutes.js
import express from "express";
import eventController from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Creazione di un nuovo evento (Protetto, solo utenti autenticati)
router.post("/", authMiddleware, eventController.createEvent);

// 📌 Ottenere tutti gli eventi
router.get("/", eventController.getAllEvents);

// 📌 Ottenere un singolo evento per ID
router.get("/:id", eventController.getEventById);

// 📌 Aggiornare un evento (Protetto, solo utenti autenticati)
router.put("/:id", authMiddleware, eventController.updateEvent);

// 📌 Eliminare un evento (Protetto, solo utenti autenticati)
router.delete("/:id", authMiddleware, eventController.deleteEvent);

export default router;
