import User from "../schema/userSchema.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedException("Credenziali non valide");
  }
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new UnauthorizedException("Utente non trovato");
  }
  return user;
};

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error(
      "Errore durante la creazione dell'utente: " + error.message
    );
  }
};

export default {
  findUserByEmail,
  findUserById,
  createUser,
};
