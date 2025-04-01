// src/services/registerService.js
import userRepository from "../repository/userRepository.js";
import cryptoUtils from "../utils/cryptoUtils.js";
import UserAlreadyExistsException from "../exceptions/userAlreadyExistsException.js";
import tokenService from "./tokenService.js";

const register = async (content) => {
  // Controlliamo se l'utente esiste già
  const existingUser = await userRepository.findUserByEmail(content.email);
  if (existingUser) {
    throw new UserAlreadyExistsException(
      `L'utente con email ${content.email} esiste già`
    );
  }

  // Crittografiamo la password in modo asincrono
  const { password } = await cryptoUtils.hashPassword(content.password);

  // Creiamo il nuovo utente
  const userData = {
    name: content.name,
    email: content.email,
    password: password,
    status: "pending",
    registrationToken: cryptoUtils.generateUniqueCode(32),
  };

  // Salviamo l'utente nel database
  const user = await userRepository.createUser(userData);

  // Generiamo i token
  const tokens = tokenService.generateTokens(user);

  // Se vogliamo gestire la conferma email, possiamo inviare il link qui
  // await sendRegistrationMail(content.email, buildRegistrationLink(result._id, userData.registrationToken));

  /* return {
    _id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  }; */

  return { user, tokens }; // ✅ Ora restituiamo l'oggetto user e tokens
};

export default { register };
