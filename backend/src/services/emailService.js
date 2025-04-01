// src/services/emailService.js

/**
 * 📌 Cosa fa questo codice?
 * ✅ Configura Nodemailer con Mailtrap
 * ✅ Crea una funzione sendConfirmationEmail() che invia un'email con un token univoco.
 * ✅ Il token sarà usato per confermare la registrazione dell'utente.
 */

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import dotenv from "dotenv";

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Validazione delle variabili d'ambiente
const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "FRONTEND_URL",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variabile d'ambiente mancante: ${envVar}`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Invia un'email di conferma all'utente.
 * @param {string} email - Email del destinatario
 * @param {string} token - Token di conferma
 */
const sendConfirmationEmail = async (email, token) => {
  if (!email || !token) {
    throw new Error("Email e token sono obbligatori.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("L'indirizzo email non è valido.");
  }

  try {
    const confirmUrl = `${process.env.FRONTEND_URL}/register/confirm/${token}`;

    const template = handlebars.compile(`
      <p>Grazie per esserti registrato! Clicca il link per confermare:</p>
      <a href="{{confirmUrl}}">{{confirmUrl}}</a>
    `);

    const mailOptions = {
      from: '"Gestione Eventi" <noreply@eventi.com>',
      to: email,
      subject: "Conferma la tua registrazione",
      html: template({ confirmUrl }),
    };

    console.log(`Invio email di conferma a: ${email}`);
    await transporter.sendMail(mailOptions);
    console.log(`Email inviata con successo a: ${email}`);
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    throw new Error("Errore durante l'invio dell'email di conferma.");
  }
};

export default sendConfirmationEmail;
