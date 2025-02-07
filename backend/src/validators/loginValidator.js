import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({ passError: true });

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "L'email è obbligatoria",
    "string.email": "Inserisci un'email valida",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "La password è obbligatoria",
    "string.min": "La password deve avere almeno 6 caratteri",
    "string.max": "La password può avere massimo 100 caratteri",
  }),
});

export default validator.body(loginSchema);
