import express from "express";
import cors from "cors";
import connectDb from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

// Creiamo un'app Express
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

// Connessione a MongoDB
connectDb().then(() => {
  // Definiamo le rotte
  app.use("/api/auth", authRoutes);

  // Definiamo la porta
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server avviato sulla porta ${PORT}`));
});
