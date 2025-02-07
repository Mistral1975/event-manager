import userRepository from "../repository/userRepository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new NotFoundException(`L'utente con ID ${id} non è stato trovato`);
  }
  return user;
};

export default { getUserById };
