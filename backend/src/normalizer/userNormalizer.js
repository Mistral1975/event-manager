// src/normalizer/userNormalizer.js
const userNormalizer = (user, tokens = null) => {
  const normalizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };

  // Se abbiamo i token (registrazione/login), li aggiungiamo alla risposta
  if (tokens) {
    normalizedUser.accessToken = tokens.accessToken;
    normalizedUser.refreshToken = tokens.refreshToken;
  }

  return normalizedUser;
};

export default userNormalizer;
