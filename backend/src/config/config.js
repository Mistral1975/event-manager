import dotenv from "dotenv";
import { privateKey, publicKey } from "./keys.js";

// 🔹 Carichiamo le variabili d’ambiente
dotenv.config();

export default {
  app: {
    port: process.env.PORT || 5000,
  },
  database: {
    mongoUri: process.env.MONGO_URI,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET, // Se usiamo HMAC invece di RSA
    jwtExpiration: "1h",
    refreshTokenExpiration: "7d",
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  security: {
    privateKey,
    publicKey,
  },
};
