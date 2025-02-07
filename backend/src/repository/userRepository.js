import User from "../schema/userSchema.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

/* const findUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("Unauthorized: User not found");
  }
  return user;
}; */

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
  //findUserById,
  createUser,
};
