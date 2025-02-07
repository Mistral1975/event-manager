import userRepository from "../repositories/userRepository.js";
import cryptoUtils from "../utils/cryptoUtils.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";

const register = async (content) => {
  // Crittografiamo la password in modo asincrono
  const { password } = await cryptoUtils.hashPassword(content.password);

  // Creiamo l'oggetto utente
  const userData = {
    name: content.name,
    email: content.email,
    password: password,
    status: "pending", // Registrazione in attesa (se implementiamo la conferma email)
    registrationToken: cryptoUtils.generateUniqueCode(10),
  };

  // Salviamo l'utente nel database
  const result = await userRepository.createUser(userData);

  // Se vogliamo gestire la conferma email, possiamo inviare il link qui
  // await sendRegistrationMail(content.email, buildRegistrationLink(result._id, userData.registrationToken));

  return result;
};

const login = async (email, password) => {
  // Cerchiamo l'utente nel database
  const user = await userRepository.findUserByEmail(email);

  // Verifichiamo se la password è corretta
  const isValid = await cryptoUtils.compare(password, user.password);
  if (!isValid) {
    throw new UnauthorizedException(
      "Unauthorized: Credenziali non valide",
      100201
    );
  }

  // Generiamo i token di accesso
  const tokens = cryptoUtils.generateTokens(user);

  // Evitiamo di restituire password e dati sensibili
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    status: user.status,
    tokens,
  };
};

export default {
  register,
  login,
};
