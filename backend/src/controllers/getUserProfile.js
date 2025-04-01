// src/controllers/getUserProfile.js
import userService from "../services/userService.js";
import userNormalizer from "../normalizer/userNormalizer.js";

const getUserProfile = async (req, res) => {
  //console.log("REQ su CONTROLLER -> ", req);
  //console.log("RES su CONTROLLER -> ", res);
  try {
    const user = await userService.getUserById(req.user.subject); // `subject` contiene l'ID utente

    //console.log("USER -------> ", user);

    res.status(200).json(userNormalizer(user)); // ✅ Usiamo il normalizer
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { getUserProfile }; // Esporta come oggetto
