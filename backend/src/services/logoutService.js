import userRepository from "../repository/userRepository.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";
import tokenService from "./tokenService.js";

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedException("Refresh token mancante");
  }

  // Trova nel database l'utente associato al refreshToken
  const user = await userRepository.findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new UnauthorizedException("Utente non autorizzato");
  }

  // Rimuove il refresh token specifico dell'utente
  await userRepository.removeRefreshToken(user._id, refreshToken);

  return { message: "Logout effettuato con successo" };
};

export default { logout };
