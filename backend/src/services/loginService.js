// src/services/loginService.js
import userRepository from "../repository/userRepository.js";
import cryptoUtils from "../utils/cryptoUtils.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";
import tokenService from "./tokenService.js";

const login = async (email, password) => {
  // Cerchiamo l'utente nel database
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedException("Credenziali non valide");
  }

  // Verifichiamo se la password è corretta
  const isValid = await cryptoUtils.comparePassword(password, user.password);
  if (!isValid) {
    throw new UnauthorizedException("Credenziali non valide");
  }

  // Generiamo i token di accesso
  const tokens = await tokenService.generateTokens(user);

  // Evitiamo di restituire password e dati sensibili
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    //status: user.status,
    //accessToken: tokens.accessToken,
    //refreshToken: tokens.refreshToken,
    tokens,
  };
};

export default { login };
