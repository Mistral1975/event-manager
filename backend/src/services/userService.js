// src/services/userService.js
import userRepository from "../repository/userRepository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

/**
 * Trova un utente per ID.
 */
const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new NotFoundException(`L'utente con ID ${id} non è stato trovato`);
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new NotFoundException(
      `L'utente con email ${email} non è stato trovato`
    );
  }

  return user;
};

/**
 * Aggiorna i dati di un utente.
 */
const updateUser = async (email, updateData) => {
  const updatedUser = await userRepository.updateUserByEmail(email, updateData);
  if (!updatedUser) {
    throw new NotFoundException(
      `Impossibile aggiornare l'utente con email ${email}`
    );
  }
  return updatedUser;
};

export default { getUserById, getUserByEmail, updateUser };
