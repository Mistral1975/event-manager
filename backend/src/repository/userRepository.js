import User from "../schema/userSchema.js";

/**
 * 🔹 Trova un utente tramite email
 * @param {string} email - L'email dell'utente
 * @returns {Promise<User|null>} - Ritorna l'utente o null se non esiste
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * 🔹 Trova un utente tramite ID, escludendo campi sensibili
 * @param {string} id - L'ID dell'utente
 * @returns {Promise<User|null>} - Ritorna l'utente o null se non esiste
 */
const findUserById = async (id) => {
  return await User.findById(id).select("-password -__v -updatedAt");
};

/**
 * 🔹 Crea un nuovo utente nel database
 * @param {Object} userData - I dati dell'utente da salvare
 * @returns {Promise<User>} - Ritorna l'utente salvato
 * @throws {Error} - Se la creazione fallisce
 */
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

/**
 * 🔹 Sostituisce tutti i refresh token esistenti con uno nuovo (single-session login)
 * @param {string} userId - L'ID dell'utente
 * @param {string} refreshToken - Il nuovo refresh token
 * @returns {Promise<User|null>} - L'utente aggiornato o null se non trovato
 */
const setRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(userId, {
    refreshTokens: [refreshToken], // Sovrascrive eventuali token precedenti
  });
};

/**
 * 🔹 Trova un utente tramite il suo refresh token
 * @param {string} refreshToken - Il token di refresh dell'utente
 * @returns {Promise<User|null>} - L'utente se il token è valido, altrimenti null
 */
const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshTokens: refreshToken });
};

/**
 * 🔹 Rimuove un refresh token dall'array dei token dell'utente
 * @param {string} userId - L'ID dell'utente
 * @param {string} refreshToken - Il token da rimuovere
 * @returns {Promise<User|null>} - L'utente aggiornato o null se non trovato
 */
const removeRefreshToken = async (userId, refreshToken) => {
  console.log("🔹 Rimozione token per utente:", userId, "Token:", refreshToken); // 🔥 Debug

  // 🔹 Controlliamo se il refreshToken è effettivamente presente prima di rimuoverlo
  const user = await User.findById(userId);
  if (!user) {
    console.log("❌ Utente non trovato!");
    throw new Error("Utente non trovato");
  }

  console.log("🔹 Refresh tokens PRIMA della rimozione:", user.refreshTokens);

  // 🔹 Se refreshTokens non è un array, lo reimpostiamo come array vuoto
  if (!Array.isArray(user.refreshTokens)) {
    console.log("❌ refreshTokens non è un array! Resetto a []");
    await User.findByIdAndUpdate(userId, { refreshTokens: [] });
    return;
  }

  // 🔹 Rimuoviamo il token se è presente
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { refreshTokens: refreshToken } },
    { new: true }
  );

  console.log(
    "🔹 Refresh tokens DOPO la rimozione:",
    updatedUser.refreshTokens
  );

  return updatedUser;
};

/**
 * 🔹 Rimuove tutti i refresh token di un utente (logout completo da tutti i dispositivi)
 * @param {string} userId - L'ID dell'utente
 * @returns {Promise<User|null>} - L'utente aggiornato o null se non trovato
 */
const clearRefreshTokens = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { refreshTokens: [] } }, // Pulisce tutti i token
    { new: true }
  );
};

export default {
  findUserByEmail,
  findUserById,
  createUser,
  setRefreshToken,
  findUserByRefreshToken,
  removeRefreshToken,
  clearRefreshTokens,
};
