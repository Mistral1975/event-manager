// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../services/userService.js";
import emailService from "../services/emailService.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se l'utente esiste già
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email già registrata" });
    }

    // Crittografa la password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Genera il token di conferma
    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Salva l'utente con isConfirmed = false
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      isConfirmed: false,
      confirmationToken,
    });

    // Invia l'email di conferma
    await emailService.sendConfirmationEmail(email, confirmationToken);

    res
      .status(201)
      .json({ message: "Registrazione completata! Controlla la tua email." });
  } catch (err) {
    res.status(500).json({ message: "Errore nella registrazione" });
  }
};

/**
 * Conferma l'email dell'utente tramite token.
 */
const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verifica il token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Trova l'utente nel database
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Utente non trovato" });
    }

    // Controlla se l'email è già confermata
    if (user.isConfirmed) {
      return res.status(400).json({ message: "Email già confermata" });
    }

    // Conferma l'email e rimuove il token di conferma
    await userService.updateUser(email, {
      isConfirmed: true,
      confirmationToken: null,
    });

    res.status(200).json({ message: "Email confermata con successo!" });
  } catch (error) {
    res.status(400).json({ message: "Token non valido o scaduto" });
  }
};

export default { register, confirmEmail };
