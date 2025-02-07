import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
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

// Definiamo le rotte
app.use("/api/auth", authRoutes);

// Middleware globale per la gestione degli errori
app.use(errorMiddleware);

export default app;
