// src/validators/registerValidator.js
import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({ passError: true });

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Il nome è obbligatorio",
    "string.min": "Il nome deve avere almeno 3 caratteri",
    "string.max": "Il nome può avere massimo 50 caratteri",
  }),
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

export default validator.body(registerSchema);

/**
 *
 * Definizione inline dello schema: Lo schema Joi di validazione viene definito direttamente all'interno della chiamata a validator.body()
 *
 * Se dobbiamo esportare più validatori in un array (ad esempio, per validare body, query e params)
 * è preferibile usare questa forma:
 *
 * import Joi from "joi";
 * import { createValidator } from "express-joi-validation";
 * const validator = createValidator({ passError: true });
 *
 * export default [
 *   validator.body(
 *     Joi.object().keys({
 *       name: Joi.string().min(3).max(50).required(),
 *       email: Joi.string().email().required(),
 *       password: Joi.string().min(6).max(100).required(),
 *     })
 *   ),
 * ];
 *
 *
 */
