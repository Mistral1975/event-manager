import express from "express";
import registerController from "../controllers/registerController.js";
//import loginController from "../controllers/loginController.js";
//import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Il nome è obbligatorio"),
    body("email").isEmail().withMessage("Inserisci un'email valida"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La password deve avere almeno 6 caratteri"),
  ],
  registerController
);

// Route per il login
//router.post("/login", loginController);

// Route per ottenere i dati dell'utente autenticato
//router.get("/me", authMiddleware, userController);

export default router;
