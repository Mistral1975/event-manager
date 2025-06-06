// src/app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// Creiamo l'istanza dell'app Express
const app = express();

// Middleware per parsing JSON
app.use(express.json());

// Configuriamo CORS per consentire richieste solo dal frontend
app.use(
  cors({
    origin: "http://localhost:3000", // N.B.: cambiare con l'URL del frontend in produzione
    credentials: true, // Permette l'invio di cookie e token di autenticazione
  })
);

// Definiamo le rotte principali
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/booking", bookingRoutes);

// Middleware globale per la gestione degli errori
app.use(errorMiddleware);

export default app;
