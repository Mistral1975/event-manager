import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// 🔹 Carichiamo le variabili d’ambiente
dotenv.config();

// 🔹 Leggiamo le chiavi RSA dai file .pem
const privateKey = fs.readFileSync(path.resolve("keys/private.pem"), "utf8");
const publicKey = fs.readFileSync(path.resolve("keys/public.pem"), "utf8");

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
