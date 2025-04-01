// src/controllers/registerController.js
//import { register } from "../services/registerService.js";
import registerService from "../services/registerService.js";
import userNormalizer from "../normalizer/userNormalizer.js";
import DomainException from "../exceptions/DomainExceptions.js";

/* export default async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(userNormalizer(user));
  } catch (err) {
    // 🔹 Verifichiamo se è un'eccezione personalizzata
    const statusCode = err instanceof DomainException ? err.statusCode : 500;

    res
      .status(statusCode)
      .json({ message: err.message, code: err.code || null });
  }
}; */

const registerController = async (req, res) => {
  try {
    //const user = await registerService.register(req.body);
    //res.status(201).json(userNormalizer(user));

    const { user, tokens } = await registerService.register(req.body); // 🔹 Ora register restituisce anche i token
    res.status(201).json(userNormalizer(user, tokens)); // 🔹 Passiamo i token al normalizer
  } catch (err) {
    // 🔹 Verifichiamo se è un'eccezione personalizzata
    const statusCode = err instanceof DomainException ? err.statusCode : 500;

    res
      .status(statusCode)
      .json({ message: err.message, code: err.code || null });
  }
};

// Esporta un oggetto con tutti i metodi del controller
export default registerController;
