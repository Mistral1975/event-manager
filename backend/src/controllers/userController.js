// src/controllers/userController.js
import userService from "../services/userService.js";
import userNormalizer from "../normalizer/userNormalizer.js";

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.subject); // `subject` contiene l'ID utente
    res.status(200).json(userNormalizer(user));
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default { getUserProfile }; // Esporta come oggetto
