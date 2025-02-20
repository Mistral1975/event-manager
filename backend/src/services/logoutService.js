import userRepository from "../repository/userRepository.js";
//import cryptoUtils from "../utils/cryptoUtils.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";
//import tokenService from "./tokenService.js";

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedException("Refresh token mancante");
  }

  // Cerchiamo l'utente nel database tramite il refreshToken
  const user = await userRepository.findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new UnauthorizedException("Utente non autorizzato");
  }

  console.log(user);

  // Rimuoviamo il refresh token dall'array
  await userRepository.removeRefreshToken(user._id, refreshToken);

  return { message: "Logout effettuato con successo" };
};

export default { logout };
