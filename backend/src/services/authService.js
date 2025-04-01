// src/services/authService.js
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

/**
 * Verifica il token di conferma email e attiva l'account utente.
 */
const verifyEmailToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return { success: false, message: "Utente non trovato" };
    }

    if (user.isConfirmed) {
      return { success: false, message: "Email già confermata" };
    }

    await userRepository.updateUser(email, {
      isConfirmed: true,
      confirmationToken: null,
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Token non valido o scaduto" };
  }
};

export default verifyEmailToken;
