import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
//import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import registerValidator from "../validators/registerValidator.js";
import loginValidator from "../validators/loginValidator.js";

const router = express.Router();

// Route per la registrazione con validazione Joi
router.post("/register", registerValidator, registerController);

// Route per il login con validazione Joi
router.post("/login", loginValidator, loginController);

// Route per ottenere i dati dell'utente autenticato
//router.get("/me", authMiddleware, userController);

export default router;
