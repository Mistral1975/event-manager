import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import refreshTokenController from "../controllers/refreshTokenController.js";
import getUserController from "../controllers/getUserProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import registerValidator from "../validators/registerValidator.js";
import loginValidator from "../validators/loginValidator.js";
import logoutController from "../controllers/logoutController.js";

const router = express.Router();

// Route per la registrazione con validazione Joi
//router.post("/register", registerValidator, registerController);
router.post("/register", registerValidator, registerController);

// Route per il login con validazione Joi
router.post("/login", loginValidator, loginController);

// Route per il refresh del token
router.post("/refresh", refreshTokenController.refreshToken);

// Route per il logout (revoca il refresh token)
router.post("/logout", authMiddleware, logoutController.logoutUser);

// 🔐 Route protetta: Recupera il profilo dell'utente autenticato
router.get("/me", authMiddleware, getUserController.getUserProfile);

export default router;
