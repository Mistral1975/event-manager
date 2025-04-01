// src/controllers/logoutController.js
import logoutService from "../services/logoutService.js";
import DomainException from "../exceptions/DomainExceptions.js";

const logoutUser = async (req, res) => {
  try {
    //const tokens = await logoutService.logout(req.body.refreshToken);
    //res.status(200).json(tokens);
    await logoutService.logout(req.body.refreshToken);
    res.status(200).json({ message: "Logout effettuato con successo" });
  } catch (err) {
    //res.status(err.statusCode || 500).json({ message: err.message });
    const statusCode = err instanceof DomainException ? err.statusCode : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

export default { logoutUser }; // Esporta come oggetto
