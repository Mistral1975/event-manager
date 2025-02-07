import { register } from "../services/registerService.js";
import userNormalizer from "../normalizer/userNormalizer.js";
import DomainException from "../exceptions/DomainExceptions.js";

export default async (req, res) => {
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
};
